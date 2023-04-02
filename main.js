const rdb = firebase.database().ref('pesan')

//! login password
var user;
const password = document.getElementById('password')
const kirimPassword = document.getElementById('kirimPassword')


const loadDb = (rdb) => {
    rdb.once('value', (snaps) => {
        snaps.forEach(snapz => {
            const snap = snapz.val()
            let chat = document.getElementById('chat')
            let chatList = document.createElement('p')
            console.log(snap.pesan);
            chatList.textContent = snap.pesan
            if (snap.user === 'mori'){
                chatList.style.textAlign = 'right'
            } else {
                chatList.style.textAlign = "left"
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
        if (snap.user === 'mori'){
            chatList.style.textAlign = 'right'
        } else {
            chatList.style.textAlign = "left"
        }
        console.log(chatList);
        chat.appendChild(chatList)
        console.log('berhasil updateDb');
    })
}


kirimPassword.addEventListener('click', (e) => {
    e.preventDefault()

    loadDb(rdb)
    
    if (password.value === 'me') {
        user = 'me'
    } else if (password.value === '14') {
        user = 'mori'
    } else {
        user = 'random'
    }

    // tampilkan forum chat
    document.getElementById('forumChat').style.display = "block"
    document.getElementById('loginForum').style.display = "none"


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
        const waktu = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    
        const gabung = {
            'pesan' : pesan.value,
            'tanggal' : waktu,
            'user' : user
        }
        
        rdb.push().set(gabung)
        pesan.value = ''
    }

})
