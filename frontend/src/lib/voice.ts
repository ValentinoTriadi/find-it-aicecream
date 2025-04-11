import AgoraRTC from 'agora-rtc-react';

export const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });