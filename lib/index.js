/*
Copyright (C) 2011 Patrick Gillespie, http://patorjk.com/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
    Extendible BBCode Parser v1.0.0
    By Patrick Gillespie (patorjk@gmail.com)
    Website: http://patorjk.com/

    This module allows you to parse BBCode and to extend to the mark-up language
    to add in your own tags.
*/

var XBBCODE = (function () {
  "use strict";

  // -----------------------------------------------------------------------------
  // Set up private variables
  // -----------------------------------------------------------------------------

  var me = {},
    tags,
    tagList,
    tagsNoParseList = [],
    bbRegExp,
    pbbRegExp,
    pbbRegExp2,
    openTags,
    closeTags;

  tags = require('./tagCompiler');

  // create tag list and lookup fields
  function initTags() {
    tagList = [];
    var prop,
      ii,
      len;
    for (prop in tags) {
      if (tags.hasOwnProperty(prop)) {
        if (prop === "*") {
          tagList.push("\\" + prop);
        } else {
          tagList.push(prop);
          if (tags[prop].noParse) {
            tagsNoParseList.push(prop);
          }
        }

        tags[prop].validChildLookup = {};
        tags[prop].validParentLookup = {};
        tags[prop].restrictParentsTo = tags[prop].restrictParentsTo || [];
        tags[prop].restrictChildrenTo = tags[prop].restrictChildrenTo || [];

        len = tags[prop].restrictChildrenTo.length;
        for (ii = 0; ii < len; ii++) {
          tags[prop].validChildLookup[tags[prop].restrictChildrenTo[ii]] = true;
        }
        len = tags[prop].restrictParentsTo.length;
        for (ii = 0; ii < len; ii++) {
          tags[prop].validParentLookup[tags[prop].restrictParentsTo[ii]] = true;
        }
      }
    }

    bbRegExp = new RegExp("<bbcl=([0-9]+) (" + tagList.join("|") + ")([ =][^>]*?)?>((?:.|[\\r\\n])*?)<bbcl=\\1 /\\2>", "gi");
    pbbRegExp = new RegExp("\\[(" + tagList.join("|") + ")([ =][^\\]]*?)?\\]([^\\[]*?)\\[/\\1\\]", "gi");
    pbbRegExp2 = new RegExp("\\[(" + tagsNoParseList.join("|") + ")([ =][^\\]]*?)?\\]([\\s\\S]*?)\\[/\\1\\]", "gi");

    // create the regex for escaping ['s that aren't apart of tags
    (function () {
      var closeTagList = [];
      for (var ii = 0; ii < tagList.length; ii++) {
        if (tagList[ii] !== "\\*") { // the * tag doesn't have an offical closing tag
          closeTagList.push("/" + tagList[ii]);
        }
      }

      openTags = new RegExp("(\\[)((?:" + tagList.join("|") + ")(?:[ =][^\\]]*?)?)(\\])", "gi");
      closeTags = new RegExp("(\\[)(" + closeTagList.join("|") + ")(\\])", "gi");
    })();

  }
  initTags();

  // -----------------------------------------------------------------------------
  // private functions
  // -----------------------------------------------------------------------------

  function checkParentChildRestrictions(parentTag, bbcode, bbcodeLevel, tagName, tagParams, tagContents, errQueue) {

    errQueue = errQueue || [];
    bbcodeLevel++;

    // get a list of all of the child tags to this tag
    var reTagNames = new RegExp("(<bbcl=" + bbcodeLevel + " )(" + tagList.join("|") + ")([ =>])", "gi"),
      reTagNamesParts = new RegExp("(<bbcl=" + bbcodeLevel + " )(" + tagList.join("|") + ")([ =>])", "i"),
      matchingTags = tagContents.match(reTagNames) || [],
      cInfo,
      errStr,
      ii,
      childTag,
      pInfo = tags[parentTag] || {};

    reTagNames.lastIndex = 0;

    if (!matchingTags) {
      tagContents = "";
    }

    for (ii = 0; ii < matchingTags.length; ii++) {
      reTagNamesParts.lastIndex = 0;
      childTag = (matchingTags[ii].match(reTagNamesParts))[2].toLowerCase();

      if (pInfo && pInfo.restrictChildrenTo && pInfo.restrictChildrenTo.length > 0) {
        if (!pInfo.validChildLookup[childTag]) {
          errStr = "The tag \"" + childTag + "\" is not allowed as a child of the tag \"" + parentTag + "\".";
          errQueue.push(errStr);
        }
      }
      cInfo = tags[childTag] || {};
      if (cInfo.restrictParentsTo.length > 0) {
        if (!cInfo.validParentLookup[parentTag]) {
          errStr = "The tag \"" + parentTag + "\" is not allowed as a parent of the tag \"" + childTag + "\".";
          errQueue.push(errStr);
        }
      }

    }

    tagContents = tagContents.replace(bbRegExp, function (matchStr, bbcodeLevel, tagName, tagParams, tagContents) {
      errQueue = checkParentChildRestrictions(tagName.toLowerCase(), matchStr, bbcodeLevel, tagName, tagParams, tagContents, errQueue);
      return matchStr;
    });
    return errQueue;
  }

  /*
      This function updates or adds a piece of metadata to each tag called "bbcl" which
      indicates how deeply nested a particular tag was in the bbcode. This property is removed
      from the HTML code tags at the end of the processing.
  */
  function updateTagDepths(tagContents) {
    tagContents = tagContents.replace(/\<([^\>][^\>]*?)\>/gi, function (matchStr, subMatchStr) {
      var bbCodeLevel = subMatchStr.match(/^bbcl=([0-9]+) /);
      if (bbCodeLevel === null) {
        return "<bbcl=0 " + subMatchStr + ">";
      } else {
        return "<" + subMatchStr.replace(/^(bbcl=)([0-9]+)/, function (matchStr, m1, m2) {
          return m1 + (parseInt(m2, 10) + 1);
        }) + ">";
      }
    });
    return tagContents;
  }

  /*
      This function removes the metadata added by the updateTagDepths function
  */
  function unprocess(tagContent) {
    return tagContent.replace(/<bbcl=[0-9]+ \/\*>/gi, "").replace(/<bbcl=[0-9]+ /gi, "&#91;").replace(/>/gi, "&#93;");
  }

  function processParams(params) {
    if (!params) return;
    return params.replace(/^=["']?/, '').replace(/["']$/, '');
  }

  var replaceFunct = function (matchStr, bbcodeLevel, tagName, tagParams, tagContents) {
    tagName = tagName.toLowerCase();

    var processedContent = tags[tagName].noParse ? unprocess(tagContents) : tagContents.replace(bbRegExp, replaceFunct);
    var processedParams = processParams(tagParams);

    var renderParams = {
      content: processedContent,
      params: processedParams,
    };

    var tagInstance = new tags[tagName];
    return tagInstance.render(renderParams);
  };

  function parse(config) {
    var output = config.text;
    output = output.replace(bbRegExp, replaceFunct);
    return output;
  }

  /*
      The star tag [*] is special in that it does not use a closing tag. Since this parser requires that tags to have a closing
      tag, we must pre-process the input and add in closing tags [/*] for the star tag.
      We have a little levaridge in that we know the text we're processing wont contain the <> characters (they have been
      changed into their HTML entity form to prevent XSS and code injection), so we can use those characters as markers to
      help us define boundaries and figure out where to place the [/*] tags.
  */
  function fixStarTag(text) {
    text = text.replace(/\[(?!\*[ =\]]|list([ =][^\]]*)?\]|\/list[\]])/ig, "<");
    text = text.replace(/\[(?=list([ =][^\]]*)?\]|\/list[\]])/ig, ">");

    while (text !== (text = text.replace(/>list([ =][^\]]*)?\]([^>]*?)(>\/list])/gi, function (matchStr, contents, endTag) {

      var innerListTxt = matchStr;
      while (innerListTxt !== (innerListTxt = innerListTxt.replace(/\[\*\]([^\[]*?)(\[\*\]|>\/list])/i, function (matchStr, contents, endTag) {
        if (endTag.toLowerCase() === ">/list]") {
          endTag = "</*]</list]";
        } else {
          endTag = "</*][*]";
        }
        return "<*]" + contents + endTag;
      })));

      innerListTxt = innerListTxt.replace(/>/g, "<");
      return innerListTxt;
    })));

    // add ['s for our tags back in
    text = text.replace(/</g, "[");
    return text;
  }

  function addBbcodeLevels(text) {
    while (text !== (text = text.replace(pbbRegExp, function (matchStr, tagName, tagParams, tagContents) {
      matchStr = matchStr.replace(/\[/g, "<");
      matchStr = matchStr.replace(/\]/g, ">");
      return updateTagDepths(matchStr);
    })));
    return text;
  }

  // -----------------------------------------------------------------------------
  // public functions
  // -----------------------------------------------------------------------------

  // API, Expose all available tags
  me.tags = function () {
    return tags;
  };

  // API
  me.addTags = function (newtags) {
    var tag;
    for (tag in newtags) {
      tags[tag] = newtags[tag];
    }
    initTags();
  };

  me.process = function (config) {

    var ret = { html: "", error: false },
      errQueue = [];

    config.text = config.text.replace(/</g, "&lt;"); // escape HTML tag brackets
    config.text = config.text.replace(/>/g, "&gt;"); // escape HTML tag brackets

    config.text = config.text.replace(openTags, function (matchStr, openB, contents, closeB) {
      return "<" + contents + ">";
    });
    config.text = config.text.replace(closeTags, function (matchStr, openB, contents, closeB) {
      return "<" + contents + ">";
    });

    config.text = config.text.replace(/\[/g, "&#91;"); // escape ['s that aren't apart of tags
    config.text = config.text.replace(/\]/g, "&#93;"); // escape ['s that aren't apart of tags
    config.text = config.text.replace(/</g, "["); // escape ['s that aren't apart of tags
    config.text = config.text.replace(/>/g, "]"); // escape ['s that aren't apart of tags

    // process tags that don't have their content parsed
    while (config.text !== (config.text = config.text.replace(pbbRegExp2, function (matchStr, tagName, tagParams, tagContents) {
      tagContents = tagContents.replace(/\[/g, "&#91;");
      tagContents = tagContents.replace(/\]/g, "&#93;");
      tagParams = tagParams || "";
      tagContents = tagContents || "";
      return "[" + tagName + tagParams + "]" + tagContents + "[/" + tagName + "]";
    })));

    config.text = fixStarTag(config.text); // add in closing tags for the [*] tag
    config.text = addBbcodeLevels(config.text); // add in level metadata

    errQueue = checkParentChildRestrictions("bbcode", config.text, -1, "", "", config.text);

    ret.html = parse(config);

    if (ret.html.indexOf("[") !== -1 || ret.html.indexOf("]") !== -1) {
      errQueue.push("Some tags appear to be misaligned.");
    }

    if (config.removeMisalignedTags) {
      ret.html = ret.html.replace(/\[.*?\]/g, "");
    }
    if (config.addInLineBreaks) {
      ret.html = '<div style="white-space:pre-wrap;">' + ret.html + '</div>';
    }

    if (!config.escapeHtml) {
      ret.html = ret.html.replace("&#91;", "["); // put ['s back in
      ret.html = ret.html.replace("&#93;", "]"); // put ['s back in
    }

    ret.error = errQueue.length !== 0;
    ret.errorQueue = errQueue;

    return ret;
  };

  return me;
})();

// for node
if (typeof module !== "undefined") {
  module.exports = XBBCODE;
}