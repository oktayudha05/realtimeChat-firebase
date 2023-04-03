const rdb = firebase.database().ref('pesan')
const rdbPass = firebase.database().ref('user-login')

//! login password
var user;
const password = document.getElementById('password')
const kirimPassword = document.getElementById('kirimPassword')


const loadDb = (rdb, user) => {
    rdb.once('child_added', (snaps) => {
        snaps.forEach(snapz => {
            const snap = snapz.val()
            let chat = document.getElementById('chat')
            let chatList 
            console.log(snap.user);
            chatList.textContent = snap.pesan
            if (snap.user === 'mori'){
                chatList = document.createElement('p')
                chatList.style.textAlign = 'right'
                chatList.setAttribute('class', 'alert-success alert')
            } else if (snap.user === 'me') {
                chatList = document.createElement('p')
                chatList.style.textAlign = "left"
                chatList.setAttribute('class', 'alert-primary alert')
            } else if (snap.user === 'random'){
                chatList = document.createElement('p')
                chatList.style.textAlign = "left"
                chatList.setAttribute('class', 'alert-warning alert')
            }
            console.log(chatList);
            chat.appendChild(chatList)
        })
    })
}

const updateDb = (rdb) => {
    rdb.on('child_added', (snaps) => {
        const snap = snaps.val()
        let chat = document.getElementById('chat')
        let chatList = document.createElement('p')
        console.log(snap.pesan);
        chatList.textContent = snap.pesan
        if (snap.password === '14' || snap.user === 'mori'){
            chatList.style.textAlign = 'right'
            chatList.setAttribute('class', 'alert-success alert')
        } else if (snap.password === 'me' || snap.user === 'me') {
            chatList.style.textAlign = "left"
            chatList.setAttribute('class', 'alert-primary alert')
            
        } else {
            chatList.style.textAlign = "left"
            chatList.setAttribute('class', 'alert-warning alert')

        }
        console.log(chatList);
        chat.appendChild(chatList)
        console.log('berhasil updateDb');
    })
}

kirimPassword.addEventListener('click', (e) => {
    e.preventDefault()
    const date = new Date()
    const jam = date.toTimeString().split(' ')[0]
    const hari = date.toLocaleDateString('en-GB').replace('/', '-').replace('/', '-');
    const waktu = `${hari} ${jam}`

    if (password.value < 1) {
            alert('passwordnya masukin dlu')
        } else {
            if (password.value === '14' || password.value === 'me' || password.value === 'test') {
                if (password.value === 'me') {
                    user = 'me'
                } else if (password.value === '14') {
                    user = 'mori'
                } else {
                    user = 'random'
                }
                if (password.value === 'test') {
                    document.getElementById('test').style.display = "none"
                    document.getElementById('form-message mt-3').innerHTML = `
                    <div class="col-12">
                        <div class="text-center alert-dark alert">user test tidak bisa mengirim pesan</div>
                    </div>`

                }
                rdbPass.child(`${waktu} (${password.value})`).set({
                    'password' : password.value,
                    'waktu' : waktu,
                })
                loadDb(rdb, user)
                
                // tampilkan forum chat
                document.getElementById('forumChat').style.display = "block"
                document.getElementById('loginForum').style.display = "none"
            } else {
                alert('password tidak sesuai')
                password.value = ''
            }
        }  
})


updateDb(rdb)


const kirim = document.getElementById('kirim')
kirim.addEventListener('click', e => {
    e.preventDefault()
    console.log(user);

    let pesan = document.getElementById('pesan')
    if (pesan.value < 1) {
        alert('isi pesannya dulu')
    } else {
        const date = new Date()
        const chat = document.getElementById('chat')
        const jam = date.toTimeString().split(' ')[0]
        const hari = date.toLocaleDateString('en-GB').replace('/', '-').replace('/', '-');
        const waktu = `${hari} ${jam}`
    
        const gabung = {
            'pesan' : pesan.value,
            'password' : password.value
        }
        
        rdb.child(`${waktu} (${password.value})`).set(gabung)
        pesan.value = ''
    }

})
