console.log("hello, vue") // testing

const app = Vue.createApp({
    // any data, functions
    // template: '<h2>I am a template</h2>'
    data() {
        return {
            url: 'http://www.thenetninja.co.uk',
            showBooks: true,
            books: [
                { title: 'name of the wind', author: 'patrick rothfuss', img: 'assets/vuebook1.jpg', isFav: true},
                { title: 'the way of kings', author: 'brandon sanderson', img: 'assets/vuebook2.jpg', isFav: false},
                { title: 'the final empire', author: 'brandon sanderson', img: 'assets/vuebook1.jpg', isFav: true}
            ]
        }
    },
    methods: {
        changeTitle(title) {
            this.title = title
        },
        toggleShowBooks() {
            this.showBooks = !this.showBooks
        },
        handleEvent(e, data) {
            console.log(e, e.type)
            if(data) {
                console.log(data)
            }
        },
        handleMousemove(e) {
            this.x = e.offsetX
            this.y = e.offsetY
        },
        toggleIsFav(book) {
            book.isFav = !book.isFav
        }
    },
    computed: {
        filteredBooks() {
            return this.books.filter((book) => book.isFav)
        }
    }
})

app.mount('#app')
