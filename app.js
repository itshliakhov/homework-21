class Post {
    constructor(prop) {
        this.form = prop.form;
        this.dataInput = prop.dataInput;
        this.sendButton = prop.sendButton;
        this.dataInfo = prop.dataInfo;
        this.dataComments = prop.dataComments;
    }
    init() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            event.target.reset();
            this.dataComments.innerHTML = "";
        })
        this.showPost()
    }
    findValue() {
        this.dataInput.addEventListener("input", () => {
            this.dataValue = this.dataInput.value;
        })
    }
    showPost() {
        this.findValue();
        this.sendButton.addEventListener("click", async()=>{
            let response = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${this.dataValue}`);
            let data = await response.json();
            this.post = data[0];
            if (!this.post) {
                this.dataInfo.innerHTML =
                    `
                        <p>I am sorry, but there is no user with such id :(</p>
                        <img src="images/error.png">
`;
            } else {
                this.dataInfo.innerHTML =
                    `
                        <p>UserId: ${this.post.userId}</p>
                        <p>Id: ${this.post.id}</p>
                        <p>Title: ${this.post.title}/</p>
                        <p>Body: ${this.post.body}</p>
                        `;
                this.showComments();
            }
        })
    }
    showComments() {
        this.newBtn = document.createElement("button");
        this.newBtn.classList.add("container__comments-Btn");
        this.dataComments.appendChild(this.newBtn).innerText = "Show Comments";
        this.newBtn.addEventListener("click", async()=>{
            let response = await fetch(`https://jsonplaceholder.typicode.com/post/${this.dataValue}/comments`);
            let data = await response.json();
            this.comments = data.map((comment)=>{
                return `
                   <div class="container__comment">
                   <p>Name: ${comment.name}</p>
                   <p>Email: ${comment.email}</p>
                   <p>Comment: ${comment.body}</p>     
                   </div> 
                   `
            });
            this.dataComments.innerHTML = this.comments.join("");
        })
    }
}
const post = new Post({
    form: document.querySelector(".js--form"),
    dataInput: document.querySelector(".js--input"),
    sendButton: document.querySelector(".js--sendData"),
    dataInfo: document.querySelector(".js--userData"),
    dataComments: document.querySelector(".js--comments")
});
post.init()