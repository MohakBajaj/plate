import type { SlateEditor } from '@platejs/core';
import type { TText } from '@platejs/slate';

import { type TLinkElement, KEYS } from '@platejs/utils';

import type { UpsertLinkOptions } from './upsertLink';

/**
 * If the text is different than the link above text, replace link children by a
 * new text. The new text has the same marks than the first text replaced.
 */
export const upsertLinkText = (
  editor: SlateEditor,
  { text }: UpsertLinkOptions
) => {
  const newLink = editor.api.above<TLinkElement>({
    match: { type: editor.getType(KEYS.link) },
  });

  if (newLink) {
    const [newLinkNode, newLinkPath] = newLink;

    if (text?.length && text !== editor.api.string(newLinkPath)) {
      const firstText = newLinkNode.children[0];

      // remove link children
      editor.tf.replaceNodes<TText>(
        { ...firstText, text },
        {
          at: newLinkPath,
          children: true,
          select: true,
        }
      );
    }
  }
};
