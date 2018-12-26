const ProgressTag = ({ content, params }) => {
  let state = params || 0;

  return `<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="${state}" aria-valuemin="0" aria-valuemin="100" style="width: ${state}%;">${content}</div></div>`;
}

module.exports = {
  name: 'progress',
  tag: ProgressTag,
};