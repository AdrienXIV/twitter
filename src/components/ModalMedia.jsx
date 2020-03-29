import React from "react";
import { Image, Modal } from "semantic-ui-react";
export function ModalMedia(props) {
  return (
    <Modal trigger={<Image src={props.src} />}>
      <Modal.Content image>
        <Image fluid src={props.src} />
      </Modal.Content>
    </Modal>
  );
}
