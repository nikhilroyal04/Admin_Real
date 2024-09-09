const VITE_ENV= import.meta.env.VITE_ENV

class ConsoleManager {
    log(data) {
      switch (VITE_ENV) {
        case 'dev':
          console.log(data);
          break;
        case 'prod':
          break;
        case 'stagging':
          break;
        default:
          break;
      }
    }
  
    error(data) {
      switch (VITE_ENV) {
        case 'dev':
          console.error(data);
          break;
        case 'prod':
          break;
        case 'stagging':
          break;
        default:
          break;
      }
    }
  }
  
  export default new ConsoleManager();
  