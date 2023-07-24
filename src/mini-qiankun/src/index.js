import { registerMicroApps, start } from './qiankun';

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: 'http://localhost:8686/index.html',
    container: '#test',
    activeRule: '/login',
  }
]);

start();