const launchButton = document.getElementById('launch');
launchButton.addEventListener('click', () => launch('jats'));

function launch(app) {
    launcher.launch(app);
}