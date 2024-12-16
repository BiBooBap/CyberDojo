class ProgressNotifier {
    constructor() {
      this.observers = [];
    }
  
    addObserver(observer) {
      this.observers.push(observer);
    }
  
    notifyObservers(event, data) {
      this.observers.forEach((observer) => observer.update(event, data));
    }
  }
  
  class ProgressObserver {
    update(event, data) {
      console.log(`Event: ${event}`, data);
    }
  }
  
  const notifier = new ProgressNotifier();
  notifier.addObserver(new ProgressObserver());
  
  module.exports = notifier;
  