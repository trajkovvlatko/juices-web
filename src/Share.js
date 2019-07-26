import React, {useState} from 'react';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import {isIOS} from './helpers';

export default function Share(props) {
  const [state, setState] = useState({id: props.id, active: false});

  function onShare() {
    const link = `${window.location.origin}/recipes/${state.id}`;
    const el = document.createElement('textarea');
    el.value = link;
    el.readonly = true;
    document.body.appendChild(el);

    if (isIOS()) {
      const range = document.createRange();
      range.selectNodeContents(el);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      el.setSelectionRange(0, 999999);
    } else {
      el.select();
    }

    document.execCommand('copy');
    document.body.removeChild(el);

    setState({id: props.id, active: true});
    setTimeout(deactivate, 2000);
  }

  function deactivate() {
    setState({id: props.id, active: false});
  }

  return (
    <div>
      <IconButton aria-label="Share" className="cart-share" onClick={onShare}>
        <ShareIcon />
      </IconButton>

      {state.active && (
        <span className="card-share-copied">Copied to clipboard.</span>
      )}
    </div>
  );
}
