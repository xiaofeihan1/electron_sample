const { app, BrowserWindow, Menu } = require('electron') // http://electron.atom.io/docs/api

let window = null

// Wait until the app is ready
app.whenReady().then(() => {
    // Create a new window
    window = new BrowserWindow({
        // Set the initial width to 800px
        width: 800,
        // Set the initial height to 600px
        height: 600,
        // Don't show the window until it ready, this prevents any white flickering
        show: false,
        webPreferences: {
            // Disable node integration in remote page
            nodeIntegration: false,
            backgroundThrottling: false
        }
    })

    // URL is argument to npm start
    const url = process.argv[2]
    window.loadURL(url)

    // Show window when page is ready
    window.once('ready-to-show', () => {
        window.maximize()
        window.show()
    })

    // Create a custom menu
    const template = [
        {
            label: 'Custom Menu',
            submenu: [
                {
                    label: 'Hide Window',
                    click: () => {
                        if (window) {
                            window.hide();
                        }
                    }
                },
                {
                    label: 'Show Window',
                    click: () => {
                        if (window) {
                            window.show();
                        }
                    }
                },
                {
                    label: 'toggle DevTools',
                    click: () => {
                        if (window) {
                            window.webContents.openDevTools()
                        }
                    }
                },
                {
                    label: 'Throttling',
                    click: () => {
                        if (window) {
                            let throttling = window.webContents.getBackgroundThrottling();
                            console.log('backgroundThrottling', throttling)
                            window.webContents.setBackgroundThrottling(!throttling);
                        }
                    }
                },
                { type: 'separator' },
                {
                    label: 'Quit',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
})
