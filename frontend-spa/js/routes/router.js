export class Router {
    constructor(routes) {
        this.routes = routes; // store route configurations
        this.initRouter(); // Initialize router logic
    }

    initRouter() {
        // Handle manual URL changes (on back/forward buttons)
        window.addEventListener('popstate', () => {
            this.loadRoute();
        });
        
        // Intercept < data-link> clicks and handle manually the navigation
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault(); // dont let browser do anything
                this.navigateTo(e.target.href); // Using our own navigation
            }
        });
    
        this.loadRoute();
    }

    navigateTo(url) {
        // Update our browser history without reload
        // state, title, url
        history.pushState(null, null, url);
        // Load the new route
        this.loadRoute();
    }

    //! o que é o async
    async loadRoute() {
        // Get current path
        const path =  window.location.pathname;

        // Find matching route or fallback to 404 not found
        //! Aqui o que é r => something e also o || é a mesma coisa que ter um if else e settar 404 se nao encontrar no find?
        const route = this.routes.find(r => r.path === path) || this.routes.find(r => r.path === '/404');

        if (route) {
            // Load HTML template
            //! o que é o await
            document.getElementById('main').innerHTML = await route.template();
            // Update page title
            document.title = route.title;
            // Initialize page-specific js (if any)
            if (route.script) 
                route.script.init();
        }
    }
}