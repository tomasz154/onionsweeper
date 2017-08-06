class SettingsStorage {
    getLevel() {
        return Number(window.localStorage.getItem('level'));
    }

    setLevel(level) {
        window.localStorage.setItem('level', level);
    }
}

export default new SettingsStorage();
