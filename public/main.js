const rdb = firebase.database().ref('pesan')
const rdbDev = firebase.database().ref('developer')
const rdbPass = firebase.database().ref('user-login')

//! login password
var user;
const password = document.getElementById('password')
const kirimPassword = document.getElementById('kirimPassword')

const loadDb = (rdb) => {
    rdb.once('child_added', (snaps) => {
        snaps.forEach(snapz => {
            const snap = snapz.val()
            let chat = document.getElementById('chat')
            let chatList 
            console.log(snap.user);
            chatList.textContent = snap.gambar
            if (snap.user === 'mori'){
                chatList = document.createElement('p')
                chatList.style.textAlign = 'right'
                chatList.setAttribute('class', 'alert-success alert')
                chat.appendChild(chatList)
            } else if (snap.user === 'me') {
                chatList = document.createElement('p')
                chatList.style.textAlign = "left"
                chatList.setAttribute('class', 'alert-primary alert')
                chat.appendChild(chatList)
            } else{
                chatList = document.createElement('p')
                chatList.style.textAlign = "left"
                chatList.setAttribute('class', 'alert-warning alert')
                chat.appendChild(chatList)
            }
            
            console.log(chatList);
        })
    })
}


const updateDb = (rdb) => {
    rdb.on('child_added', (snaps) => {
        let snap = snaps.val()
        //cari turunan snap
        let chat = document.getElementById('chat')

        if (!snap.gambar && snap.password === '14'){
            let chatList = document.createElement('p')
            chatList.style.textAlign = 'right'
            chatList.setAttribute('class', 'alert-success alert')
            chatList.textContent = snap.pesan
            chat.appendChild(chatList)
        } else if (!snap.gambar && snap.password === 'me') {
            let chatList = document.createElement('p')
            chatList.style.textAlign = "left"
            chatList.setAttribute('class', 'alert-primary alert')
            chatList.textContent = snap.pesan
            chat.appendChild(chatList)
        } else if (snap.user === 'random' && !snap.gambar){
            let chatList = document.createElement('p')
            chatList.style.textAlign = "left"
            chatList.setAttribute('class', 'alert-warning alert')
            chatList.textContent = snap.pesan
            chat.appendChild(chatList)
        } 
        if (snap.gambar) {
            let chatList = document.createElement('img')
            chatList.setAttribute('src', `${snap.gambar}`)
           
            if (snap.password === '14' || snap.user === 'mori') {
                chatList.style.textAlign = 'right'
                chatList.setAttribute('class', 'alert-success alert image d-block')
            } else if (snap.password === 'me' || snap.user === 'me') {
                chatList.style.textAlign = "left"
                chatList.setAttribute('class', 'alert-primary alert image d-block')
            } else {
                chatList.style.textAlign = "left"
                chatList.setAttribute('class', 'alert-warning alert image d-block')
            }
            console.log(chatList);
            chat.appendChild(chatList)
        }
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
            if (password.value === '14' || password.value === 'me' || password.value === 'test' || password.value === 'developer') {
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
                    if (user === 'random') {
                    rdbDev.child(`${waktu} (${password.value})`).set({
                        'password' : password.value,
                        'waktu' : waktu,
                    })
                } else {
                    rdbPass.child(`${waktu} (${password.value})`).set({
                        'password' : password.value,
                        'waktu' : waktu,
                    })

                }
 
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
            'password' : password.value, 
            'user' : user
        }
        
        
        rdb.child(`${waktu} (${password.value})`).set(gabung)

        pesan.value = ''
    }

})

const pilihGambar = () => {
    document.getElementById('kirim-gambar').click()
}

const sendImage = (e) => {
    const password = document.getElementById('password')
    const date = new Date()
    const chat = document.getElementById('chat')
    const jam = date.toTimeString().split(' ')[0]
    const hari = date.toLocaleDateString('en-GB').replace('/', '-').replace('/', '-');
    const waktu = `${hari} ${jam}`
    let file = e.files[0]
    if(!file.type.match('image.*')) {
        alert('pilih gambar yg bener')
    } else {
        let reader = new FileReader()
        reader.addEventListener('load', () => {
            rdb.child(`${waktu} (${password.value})`).set({
            'gambar' : reader.result,
            'password' : password.value, 
            'user' : user,
            'type' : 'gambar'
            });
        }, false);
        if (file) {
            reader.readAsDataURL(file)
        }
    }
} 
