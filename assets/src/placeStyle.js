const K_WIDTH = 30;
const K_HEIGHT = 30;

const placeStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  // border: '3px solid #f44336',
  border: 'none',
  borderRadius: K_HEIGHT,
  // backgroundColor: 'white',
  backgroundColor: 'none',
  textAlign: 'center',
  color: 'black',
  fontSize: 24,
  // padding: 2
};

export {placeStyle};