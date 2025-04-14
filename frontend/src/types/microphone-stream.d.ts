declare module 'microphone-stream' {
  import { Readable } from 'stream';

  export default class MicrophoneStream extends Readable {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(options?: any);
    setStream(stream: MediaStream): void;
    stop(): void;
    on(event: 'data', callback: (chunk: Uint8Array) => void): this;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on(event: string, callback: (...args: any[]) => void): this;
    static toRaw(buffer: Uint8Array): Int16Array | null;
  }
}
