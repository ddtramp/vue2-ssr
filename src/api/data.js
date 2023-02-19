const getData = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve([
            {
                id: 1,
                item: '测试1'
            },
            {
                id: 2,
                item: '测试2'
            },
        ])
    }, 1000)
})

export {
    getData
}