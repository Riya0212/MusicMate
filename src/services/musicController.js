import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
} from 'react-native-track-player';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [Capability.Play, Capability.Pause],
      compactCapabilities: [Capability.Play, Capability.Pause],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTrack() {
  await TrackPlayer.add([
    {
      artists: [
        {
          name: 'Carly Rae Jepsen',
          type: 'artist',
        },
      ],
      id: '0tGPJ0bkWOUmH7MEOR77qc',
      images: [
        {
          url: 'https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1',
          width: 640,
          height: 640,
        },
        {
          url: 'https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1',
          width: 300,
          height: 300,
        },
        {
          url: 'https://i.scdn.co/image/ab67616d000048517359994525d219f64872d3b1',
          width: 64,
          height: 64,
        },
      ],
      name: 'Tum Se',
      duration_ms: 207959,
      url: require('@/assets/songs/Tum_Se.mp3'),
    },
    {
      artists: [
        {
          name: 'Carly Rae Jepsen',
          type: 'artist',
        },
      ],
      id: '1tGPJ0bkWOUmH7MEOR77qc',
      images: [
        {
          url: 'https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1',
          width: 640,
          height: 640,
        },
        {
          url: 'https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1',
          width: 300,
          height: 300,
        },
        {
          url: 'https://i.scdn.co/image/ab67616d000048517359994525d219f64872d3b1',
          width: 64,
          height: 64,
        },
      ],
      name: 'Maiyya Mainu',
      duration_ms: 20795,
      url: require('@/assets/songs/Maiyya_Mainu.mp3'),
    },
    {
      artists: [
        {
          name: 'Carly Rae Jepsen',
          type: 'artist',
        },
      ],
      id: '2tGPJ0bkWOUmH7MEOR77qc',
      images: [
        {
          url: 'https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1',
          width: 640,
          height: 640,
        },
        {
          url: 'https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1',
          width: 300,
          height: 300,
        },
        {
          url: 'https://i.scdn.co/image/ab67616d000048517359994525d219f64872d3b1',
          width: 64,
          height: 64,
        },
      ],
      name: 'Thodi Der',
      duration_ms: 207959,
      url: require('@/assets/songs/Thodi_Der.mp3'),
    },
  ]);
}
