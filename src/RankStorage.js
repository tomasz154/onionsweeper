class RankStorage {
    async getRank() {
        // todo
        return [
            [
                {name: 'Tomek', time: 15},
                {name: 'Tomasz', time: 25},
            ],
            [],
            [
                {name: 'Atomek', time: 60},
            ]
        ];
    }
}

export default new RankStorage();
