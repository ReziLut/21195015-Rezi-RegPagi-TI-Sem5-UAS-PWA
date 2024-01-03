// Inisialisasi IndexedDB
var db;
var request = indexedDB.open('komentarDB', 1);

request.onerror = function(event) {
    console.log("Error saat membuka database: " + event.target.errorCode);
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("komentar", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("Nama", "Nama", { unique: false });
    objectStore.createIndex("Email", "Email", { unique: false });
    objectStore.createIndex("Subject", "Subject", { unique: false });
    objectStore.createIndex("Message", "Message", { unique: false });
};

request.onsuccess = function(event) {
    db = event.target.result;
    // showComments();
};

// Menambahkan komentar ke dalam IndexedDB
document.getElementById('Hasil').addEventListener('submit', function(event) {
    event.preventDefault();
    var Nama = document.getElementById('Nama').value;
    var Email = document.getElementById('Email').value;
    var Subject = document.getElementById('Subject').value;
    var Message = document.getElementById('Message').value;

    var transaction = db.transaction(['komentar'], 'readwrite');
    var objectStore = transaction.objectStore('komentar');
    var comment = {  Nama : Nama, Email : Email, Subject : Subject,Message:Message };
    objectStore.add(comment);
    document.getElementById('Nama').value = '';
    document.getElementById('Email').value = '';
    document.getElementById('Subject').value = '';
    document.getElementById('Message').value = '';

    //Tampilkan notifikasi menggunakan alert
    

    // showComments();
});