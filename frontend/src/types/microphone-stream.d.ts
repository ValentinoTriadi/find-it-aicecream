declare module 'microphone-stream' {
    import { Readable } from 'stream';
  
    export default class MicrophoneStream extends Readable {
      constructor(options?: any);
      setStream(stream: MediaStream): void;
      stop(): void;
      on(event: 'data', callback: (chunk: Uint8Array) => void): this;
      on(event: string, callback: (...args: any[]) => void): this;
      static toRaw(buffer: Uint8Array): Int16Array | null;
    }
  }
  