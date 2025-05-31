

// In this implementation of the observer pattern we have multiple types of events
// that is why we have a map of listeners (basically a list of listeners for each eventType)
// If we don't want to distinguish between different types of events, a simple array of listeners would be enough

class EventManager {
    constructor() {
        // I will have one array of listeners for each eventType
      this.listenersMap = {};
    }

    subscribe(eventType, listener) {
        if (this.listenersMap[eventType]) {
            this.listenersMap[eventType].push(listener)
        } else {
            this.listenersMap[eventType] = [listener]
        }
    }

    unsubscribe(eventType, listener) {
        if (this.listenersMap[eventType]) {
            this.listenersMap[eventType].splice(this.listenersMap[eventType].indexOf(listener))
        } else {
            this.listenersMap[eventType] = [listener]
        }
    }

    notify(eventType, data) {
        this.listenersMap[eventType].forEach((listener) => {
            listener.update(data)
        })
    }
}

class Editor {
    eventManager;
    file;
  
    constructor() {
      this.eventManager = new EventManager();
    }
  
    openFile(newFile) {
      this.file = newFile
      this.eventManager.notify("open", newFile);
    }
  
    addToFile(message) {
      this.file += message;
      this.eventManager.notify("addToFile", message);
    }
  }

  class EventListener {
    constructor(name) {
      this.name = name;
    }
  
    update(data) {
        
    }
  }

  class LoggingListener extends EventListener {
    constructor(name) {
      super(name);
      this.log = [];
    }
  
    update(data) {
        console.log("logging file open or modified: " + data)
      this.log.push(data);
    }
  }

  class EmailAlertsListener extends EventListener {
    constructor(name) {
      super(name);
    }
  
    update(data) {
        console.log("sending email to notify new line: " + data)
      // TODO code for sending emails to users
    }
  }

  class Application {
    config() {
      const editor = new Editor();
  
      // We will log whenever a file is open or modified
      const logger = new LoggingListener(
        "file oppening logger"
      );
      editor.eventManager.subscribe("open", logger);
      editor.eventManager.subscribe("addToFile", logger);
  
      // We will alert through email when a file is modified
      const modificationsEmailAlerts = new EmailAlertsListener(
        "modifications email alerts"
      );
      editor.eventManager.subscribe("addToFile", modificationsEmailAlerts);
  
      editor.openFile("My first document");
      editor.addToFile("additional message 1");
      editor.addToFile("additional message 2");
      editor.openFile("My second document");
      editor.addToFile("additional message 1");
      editor.addToFile("additional message 2");
    }
  }
  
  const app = new Application();
  app.config();