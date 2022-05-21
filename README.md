# Angular 13 POC - inject + eeDirectiveInject

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-ivy-1ink97)

A POC which demonstrate that Inject works with Angular 13

Routes:

- /: Example injecting dependencies outside constructor
- /todos: TodoList example using a shared service injected without constructor
- /depth: Nested components with custom providers and injection with InjectFlags;
- /auto-cd: State management and automatic change detection with detachedView and auto unsubscribe.
