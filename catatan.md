# Naskah Video Project Web Kasir — Versi 20 Menit

## 1. Pembukaan — 1 menit

Pada video ini saya akan menjelaskan project web kasir sederhana yang dibuat menggunakan React untuk frontend dan Express untuk backend.

React digunakan untuk menampilkan daftar produk, kategori, keranjang, pembayaran, dan riwayat transaksi.

Sementara itu, Express digunakan untuk menyediakan data melalui API dan memproses transaksi yang dikirim dari frontend.

Saya akan memulai dengan mendemonstrasikan aplikasi, kemudian menjelaskan alur data produk, proses penambahan produk ke keranjang, pembayaran, dan riwayat transaksi.

---

## 2. Demonstrasi aplikasi — 2 menit

[Tampilkan halaman aplikasi]

Pada halaman utama terdapat daftar produk yang dibagi menjadi beberapa kategori.

Ketika saya memilih kategori tertentu, produk yang ditampilkan akan menyesuaikan dengan kategori tersebut.

Selanjutnya, saya dapat menekan tombol **Tambah** untuk memasukkan produk ke keranjang.

Di dalam keranjang, saya dapat menambah atau mengurangi jumlah produk yang dipesan menggunakan tombol plus dan minus.

Perlu diperhatikan bahwa tombol tersebut digunakan untuk mengubah **quantity atau jumlah pesanan dalam keranjang**, bukan untuk menambah stok produk.

Saya juga dapat menghapus produk dari keranjang.

Setelah itu, aplikasi akan menghitung subtotal, pajak sebesar 10 persen, dan total pembayaran secara otomatis.

Kemudian saya memasukkan jumlah uang pelanggan dan menekan tombol **Bayar**.

Jika pembayaran berhasil, aplikasi menampilkan jumlah kembalian.

Transaksi yang sudah dibuat juga dapat dilihat melalui tombol **Riwayat**.

Alur penggunaan aplikasinya adalah:

```text
pilih kategori
→ pilih produk
→ masukkan produk ke keranjang
→ ubah quantity
→ masukkan pembayaran
→ klik Bayar
→ lihat kembalian
→ buka riwayat transaksi
```

---

## 3. Struktur project — 1 menit

Project ini dibagi menjadi dua bagian utama:

```text
web-kasir
├── frontend
└── backend
```

Folder `frontend` berisi aplikasi React.

Folder `backend` berisi server Express, route, controller, dan data aplikasi.

Frontend berjalan pada:

```text
http://localhost:3000
```

Sedangkan backend berjalan pada:

```text
http://localhost:5000
```

Frontend dan backend berkomunikasi menggunakan request HTTP melalui API.

---

# Bagian Pengambilan Data

## 4. Mengambil data produk dan kategori — 2 menit

Sekarang saya membuka file:

```text
frontend/src/pages/CashierPage.js
```

Pada komponen ini terdapat beberapa state penting.

[Tampilkan kode state]

```javascript
const [categories, setCategories] = useState([])
const [products, setProducts] = useState([])
const [cartItems, setCartItems] = useState([])
const [paymentAmount, setPaymentAmount] = useState('')
const [selectedCategory, setSelectedCategory] =
  useState('all')
```

State `categories` digunakan untuk menyimpan kategori.

State `products` digunakan untuk menyimpan data produk.

State `cartItems` digunakan untuk menyimpan produk yang dimasukkan ke keranjang.

State `paymentAmount` menyimpan jumlah uang pelanggan.

Sedangkan `selectedCategory` menyimpan kategori yang sedang dipilih.

Saat halaman pertama kali dibuka, `useEffect` menjalankan fungsi `loadData`.

[Tampilkan kode]

```javascript
useEffect(() => {
  loadData()
}, [])
```

Karena dependency array-nya kosong, fungsi ini dijalankan ketika halaman pertama kali dimuat.

Di dalam fungsi `loadData`, frontend mengambil data dari backend menggunakan `fetch`.

[Tampilkan kode]

```javascript
const categoryResponse = await fetch(
  'http://localhost:5000/api/categories'
)

const productResponse = await fetch(
  'http://localhost:5000/api/products'
)
```

Request pertama meminta data kategori.

Request kedua meminta data produk.

Response dari backend kemudian dibaca menggunakan `.json()`.

```javascript
const categoryData =
  await categoryResponse.json()

const productData =
  await productResponse.json()
```

Setelah berubah menjadi data JavaScript, hasilnya disimpan ke state.

```javascript
setCategories([
  {
    id: 'all',
    name: 'Semua',
    icon: 'bi-grid',
  },
  ...categoryData,
])

setProducts(productData)
```

Kategori `all` ditambahkan pada frontend agar pengguna dapat menampilkan seluruh produk.

---

## 5. Alur request produk di backend — 3 menit

Sekarang saya akan menelusuri request produk sampai ke backend.

Request yang dikirim frontend adalah:

```text
GET http://localhost:5000/api/products
```

Backend dijalankan melalui file:

```text
backend/src/server.js
```

[Tampilkan kode]

```javascript
import app from './app.js'

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`)
})
```

`app.listen()` membuat server berjalan dan menerima request pada port `5000`.

Selanjutnya saya membuka:

```text
backend/src/app.js
```

Di dalam file ini terdapat:

```javascript
app.use('/api/products', productRoutes)
```

Artinya, request yang dimulai dengan `/api/products` akan diteruskan ke `productRoutes`.

Sekarang saya membuka:

```text
backend/src/routes/productRoutes.js
```

[Tampilkan kode]

```javascript
router.get('/', getProducts)
```

Frontend mengirim request menggunakan method `GET`.

Karena path `/api/products` sudah ditangani oleh `app.js`, path yang diterima router hanya `/`.

Route tersebut kemudian menjalankan fungsi `getProducts`.

Fungsi ini berada di:

```text
backend/src/controllers/productController.js
```

[Tampilkan kode]

```javascript
import products from '../data/products.js'

export function getProducts(req, res) {
  res.json(products)
}
```

Controller mengambil data dari file `products.js`.

Kemudian:

```javascript
res.json(products)
```

mengirim seluruh data produk kepada frontend dalam format JSON.

Alur lengkapnya adalah:

```text
CashierPage.js
→ fetch /api/products
→ app.js
→ productRoutes.js
→ getProducts
→ products.js
→ res.json(products)
→ kembali ke frontend
```

Untuk data kategori, alurnya hampir sama.

Request `/api/categories` masuk ke `categoryRoutes`, kemudian controller mengambil data kategori dan mengirimkannya kembali sebagai JSON.

Karena alurnya sama, saya tidak perlu menjelaskan setiap file kategori satu per satu.

---

# Bagian Tampilan Produk

## 6. Filter kategori dan menampilkan produk — 2 menit

Setelah produk dan kategori disimpan ke state, frontend menentukan produk yang akan ditampilkan.

Kode filternya berada di `CashierPage.js`.

[Tampilkan kode]

```javascript
const filteredProducts = useMemo(() => {
  if (selectedCategory === 'all') {
    return products
  }

  return products.filter(
    (product) =>
      product.category === selectedCategory
  )
}, [products, selectedCategory])
```

Jika kategori yang dipilih adalah `all`, seluruh produk ditampilkan.

Jika kategori tertentu dipilih, frontend menjalankan `.filter()`.

Sebagai contoh, jika kategori yang dipilih adalah `food`, maka hanya produk dengan kategori `food` yang dimasukkan ke `filteredProducts`.

Proses filter ini dilakukan langsung di frontend dan tidak melakukan request baru ke backend.

Hasil filter kemudian dikirim ke komponen `ProductList`.

```javascript
<ProductList
  products={filteredProducts}
  onAddToCart={handleAddToCart}
/>
```

Di dalam `ProductList`, data produk di-loop menggunakan `.map()`.

```javascript
{products.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
    onAddToCart={onAddToCart}
  />
))}
```

Setiap object produk kemudian ditampilkan melalui komponen `ProductCard`.

Di dalam `ProductCard`, data digunakan untuk menampilkan nama, deskripsi, harga, dan informasi produk lainnya.

Ketika tombol Tambah ditekan:

```javascript
onClick={() => onAddToCart(product)}
```

object produk tersebut dikirim ke fungsi `handleAddToCart`.

---

# Bagian Keranjang

## 7. Menambahkan produk ke keranjang — 3 menit

Fungsi `handleAddToCart` berada di `CashierPage.js`.

[Tampilkan bagian penting kode]

```javascript
function handleAddToCart(product) {
  setCartItems((currentCart) => {
    const existingItem = currentCart.find(
      (item) => item.id === product.id
    )

    if (existingItem) {
      return currentCart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }

        return item
      })
    }

    return [
      ...currentCart,
      {
        ...product,
        quantity: 1,
      },
    ]
  })
}
```

Pertama, frontend mencari apakah produk sudah ada di dalam keranjang.

```javascript
const existingItem = currentCart.find(
  (item) => item.id === product.id
)
```

Jika produk sudah ada, frontend melakukan `.map()` dan menambah quantity produk tersebut.

```javascript
quantity: item.quantity + 1
```

Jika produk belum ada, object produk dimasukkan ke keranjang dengan quantity awal satu.

```javascript
{
  ...product,
  quantity: 1,
}
```

Perlu dibedakan bahwa `quantity` merupakan jumlah produk yang dipesan pelanggan di keranjang.

Quantity bukan fitur untuk menambah stok produk.

Setelah state `cartItems` berubah, React melakukan render ulang dan mengirim data keranjang ke komponen `Cart`.

```javascript
<Cart
  cartItems={cartItems}
  subtotal={subtotal}
  tax={tax}
  total={total}
  paymentAmount={paymentAmount}
  onPaymentChange={setPaymentAmount}
  onIncrease={handleIncreaseQuantity}
  onDecrease={handleDecreaseQuantity}
  onRemove={handleRemoveItem}
  onCheckout={handleCheckout}
/>
```

Di dalam komponen `Cart`, setiap item ditampilkan melalui `CartItem`.

```javascript
{cartItems.map((item) => (
  <CartItem
    key={item.id}
    item={item}
    onIncrease={onIncrease}
    onDecrease={onDecrease}
    onRemove={onRemove}
  />
))}
```

Tombol plus menjalankan fungsi untuk menambah quantity pesanan.

Tombol minus menjalankan fungsi untuk mengurangi quantity pesanan.

Sedangkan tombol hapus menghapus produk dari array `cartItems`.

---

## 8. Menghitung subtotal, pajak, dan total — 1 menit

Subtotal dihitung menggunakan `.reduce()`.

[Tampilkan kode]

```javascript
const subtotal = cartItems.reduce(
  (total, item) =>
    total + item.price * item.quantity,
  0
)
```

Untuk setiap item, harga dikalikan dengan quantity.

Kemudian seluruh hasilnya dijumlahkan.

Pajak dihitung sebesar 10 persen.

```javascript
const tax = Math.round(subtotal * 0.1)
```

Total pembayaran merupakan subtotal ditambah pajak.

```javascript
const total = subtotal + tax
```

Alurnya adalah:

```text
harga produk × quantity
→ subtotal
→ pajak 10 persen
→ total pembayaran
```

---

# Bagian Pembayaran

## 9. Input pembayaran — 1 menit

Input pembayaran berada di komponen `PaymentSummary`.

[Tampilkan kode]

```javascript
<Form.Control
  type="number"
  min="0"
  value={paymentAmount}
  placeholder="Masukkan jumlah pembayaran"
  onChange={(event) =>
    onPaymentChange(event.target.value)
  }
/>
```

Nilai input berasal dari state `paymentAmount`.

Ketika pengguna mengetik, `event.target.value` mengambil nilai terbaru dari input.

Nilai tersebut kemudian dikirim ke `setPaymentAmount`.

Saat tombol Bayar ditekan:

```javascript
onClick={onCheckout}
```

fungsi `handleCheckout` dijalankan.

---

## 10. Mengirim transaksi ke backend — 3 menit

Pada awal fungsi `handleCheckout`, frontend memastikan keranjang tidak kosong dan pembayaran valid.

[Tampilkan kode penting]

```javascript
if (cartItems.length === 0) {
  return
}

const payment = Number(paymentAmount)

if (!payment || payment <= 0) {
  window.alert(
    'Jumlah pembayaran tidak valid'
  )

  return
}
```

Setelah itu, data keranjang disederhanakan.

Frontend hanya mengirim `productId` dan `quantity`.

```javascript
const transactionItems =
  cartItems.map((item) => ({
    productId: item.id,
    quantity: item.quantity,
  }))
```

Kemudian frontend mengirim request `POST`.

```javascript
const response = await fetch(
  'http://localhost:5000/api/transactions',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: transactionItems,
      paymentAmount: payment,
    }),
  }
)
```

Method `POST` digunakan karena frontend ingin membuat transaksi baru.

Header `Content-Type` menunjukkan bahwa data dikirim dalam format JSON.

Request tersebut masuk ke backend melalui:

```javascript
app.use(
  '/api/transactions',
  transactionRoutes
)
```

Di dalam `transactionRoutes.js` terdapat:

```javascript
router.post('/', createTransaction)
```

Karena method yang digunakan adalah `POST`, backend menjalankan fungsi `createTransaction`.

Di dalam controller, backend mengambil data dari body request.

```javascript
const items = req.body.items

const paymentAmount = Number(
  req.body.paymentAmount
)
```

Backend kemudian memvalidasi data, mencari produk berdasarkan `productId`, memeriksa quantity, dan menghitung subtotal.

[Tampilkan potongan kode]

```javascript
for (const item of items) {
  const product = products.find(
    (product) =>
      product.id === Number(item.productId)
  )

  const quantity = Number(item.quantity)

  const itemSubtotal =
    product.price * quantity

  subtotal += itemSubtotal
}
```

Backend menggunakan harga produk dari data backend, bukan mempercayai harga yang dikirim frontend.

Setelah semua item diproses, backend menghitung pajak dan total.

```javascript
const tax = Math.round(subtotal * 0.1)
const total = subtotal + tax
```

Kemudian backend memeriksa apakah uang pelanggan mencukupi.

```javascript
if (paymentAmount < total) {
  return res.status(400).json({
    message: 'Uang pembayaran kurang',
  })
}
```

Jika pembayaran valid, backend membuat object transaksi baru.

```javascript
const newTransaction = {
  id: transactions.length + 1,
  items: transactionItems,
  subtotal: subtotal,
  tax: tax,
  total: total,
  paymentAmount: paymentAmount,
  change: paymentAmount - total,
  createdAt: new Date().toISOString(),
}
```

Object transaksi kemudian dimasukkan ke array transaksi.

```javascript
transactions.push(newTransaction)
```

Setelah berhasil, backend mengirim response:

```javascript
res.status(201).json({
  message: 'Transaksi berhasil',
  data: newTransaction,
})
```

Status `201` berarti transaksi baru berhasil dibuat.

---

## 11. Frontend menerima hasil transaksi — 1 menit

Kembali ke frontend, response dibaca menggunakan:

```javascript
const result = await response.json()
```

Jika backend mengirim error:

```javascript
if (!response.ok) {
  throw new Error(result.message)
}
```

Pesan tersebut akan ditampilkan kepada pengguna.

Jika transaksi berhasil, frontend menampilkan jumlah kembalian.

```javascript
window.alert(
  `Pembayaran berhasil.\nKembalian: Rp${result.data.change.toLocaleString(
    'id-ID'
  )}`
)
```

Setelah itu, keranjang dan input pembayaran dikosongkan.

```javascript
setCartItems([])
setPaymentAmount('')
```

Alur transaksi secara ringkas adalah:

```text
klik Bayar
→ handleCheckout
→ POST /api/transactions
→ transactionRoutes
→ createTransaction
→ validasi transaksi
→ hitung total
→ cek pembayaran
→ simpan transaksi
→ kirim response
→ tampilkan kembalian
→ kosongkan keranjang
```

---

# Bagian Riwayat

## 12. Menampilkan riwayat transaksi — 1 menit

Ketika tombol Riwayat ditekan, fungsi `handleShowHistory` dijalankan.

[Tampilkan bagian penting]

```javascript
const response = await fetch(
  'http://localhost:5000/api/transactions'
)

const data = await response.json()

setTransactions(data)
setShowHistory(true)
```

Frontend mengirim request:

```text
GET /api/transactions
```

Di backend, request tersebut ditangani oleh:

```javascript
router.get('/', getTransactions)
```

Controller kemudian mengirim seluruh transaksi.

```javascript
export function getTransactions(req, res) {
  res.json(transactions)
}
```

Data yang diterima disimpan ke state `transactions`, kemudian ditampilkan melalui komponen `TransactionHistory`.

Riwayat menampilkan informasi seperti ID transaksi, tanggal, daftar produk, quantity, dan total pembayaran.

---

## 13. Penutup — 1 menit

Dengan demikian, aplikasi web kasir ini memiliki alur komunikasi lengkap antara frontend React dan backend Express.

Frontend bertugas menampilkan produk, memfilter kategori, mengelola isi keranjang, menghitung tampilan pembayaran, dan mengirim transaksi.

Backend bertugas menyediakan data melalui API, memvalidasi transaksi, menghitung ulang total pembayaran, serta menyimpan transaksi sementara.

Tombol plus dan minus pada keranjang hanya digunakan untuk mengubah quantity atau jumlah pesanan pelanggan, bukan untuk menambah stok produk.

Karena project ini masih menggunakan array JavaScript sebagai penyimpanan sementara, data transaksi akan kembali kosong ketika backend dihentikan atau dijalankan ulang.

Sekian penjelasan dari project web kasir yang saya buat. Terima kasih.
