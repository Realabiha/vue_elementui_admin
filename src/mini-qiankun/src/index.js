import { registerMicroApps, start } from './qiankun';

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: 'http://localhost:8080/index.html',
    container: '#test',
    activeRule: '/login',
  }
]);

start();