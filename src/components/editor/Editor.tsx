'use client';

import Theme from './plugins/Theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { FloatingComposer, FloatingThreads, LiveblocksPlugin, liveblocksConfig, useEditorStatus } from "@liveblocks/react-lexical"
import Loader from '../Loader';
import FloatingToolbarPlugin from './FloatingToolbarPlugin';
import { useRedo, useThreads } from '@liveblocks/react/suspense';
import Comments from '../Comments';
import { useEffect, useRef } from 'react';
import { DeleteModal } from '../DeleteModal';
import { currentUser } from '@clerk/nextjs/server';

function Placeholder() {
  return <div className="editor-placeholder">
    Type Something.....
    </div>;
}
export function Editor({ roomId, currentUserType }: { roomId: string, currentUserType: UserType }) {

  const status = useEditorStatus()
  const { threads } = useThreads()

 
  const initialConfig = liveblocksConfig({
    namespace: 'Editor',
    nodes: [HeadingNode],
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
    theme: Theme,
    editable: currentUserType === 'editor'
  })

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container size-full">
        <div className='toolbar-wrapper flex min-w-full justify-center gap-2'>
          <ToolbarPlugin />
          {currentUserType === 'editor' && <DeleteModal roomId={roomId} />}
        </div>
        <div className='editor-wrapper flex flex-col items-center justify-s'>
          {status === 'not-loaded' || status === 'loading' ? (<Loader />) :
            (
              <div className='editor-inner m-h-[1100px] relative lg:ml-[18%] mb-5 h-fit w-full max-w-[800px] shadow-md lg:mb-10'>
                <RichTextPlugin
                  contentEditable={
                    <ContentEditable className='editor-input h-full' />
                  }
                  placeholder={<Placeholder />}
                  ErrorBoundary={LexicalErrorBoundary}
                />
                {currentUserType === 'editor' && <FloatingToolbarPlugin />}
                <HistoryPlugin />
                <AutoFocusPlugin />
              </div>
            )}
          <LiveblocksPlugin>
            <FloatingComposer className='w-[350px]' />
            <FloatingThreads threads={threads} />
            <Comments />
          </LiveblocksPlugin>
        </div>
        <div>
        </div>
      </div>
    </LexicalComposer>
  );
}


