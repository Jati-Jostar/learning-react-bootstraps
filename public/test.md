# Naskah Video Penjelasan Project Web Kasir

## 1. Pembukaan
Assalamualaikum warahmatullahi wabarakatuh.

Perkenalkan, saya Fida Jati dari kelas PJJ Teknik Informatika kelas A, dengan NRP 3125510033.
Pada video ini saya akan menjelaskan project web kasir sederhana yang dibuat menggunakan React untuk frontend dan Express untuk backend.

Saya akan memulai dengan mendemonstrasikan fitur aplikasi. Setelah itu, saya akan menjelaskan bagaimana frontend mengambil data dari backend, mengolah data tersebut, melakukan transaksi, memperbarui stok, dan menampilkan riwayat pembelian.

---

## 2. Demonstrasi aplikasi

Pertama, saya akan mendemonstrasikan fitur utama aplikasi.

Pada halaman ini tersedia daftar produk dan beberapa kategori, yaitu makanan, minuman, dan snack.

Ketika saya memilih salah satu kategori, produk yang tampil akan menyesuaikan dengan kategori tersebut.

Selanjutnya, saya dapat menambahkan produk ke keranjang, menambah atau mengurangi jumlah produk, dan menghapus produk dari keranjang.

Aplikasi juga menghitung subtotal, pajak sebesar 10 persen, dan total pembayaran secara otomatis.

Setelah memasukkan jumlah uang pelanggan dan menekan tombol **Bayar**, aplikasi akan memproses transaksi dan menampilkan jumlah kembalian.

Transaksi yang sudah dilakukan juga dapat dilihat melalui tombol **Riwayat** pada navbar.

---

# Bagian A — Mengambil dan menampilkan produk

## 3. Frontend meminta data produk

Setelah melihat fitur aplikasi, selanjutnya saya akan menjelaskan dari mana data produk tersebut berasal.

Data produk tidak ditulis langsung di dalam komponen tampilan. Frontend mengambil data dari backend melalui API.

Untuk melihat data yang disediakan backend, saya dapat membuka endpoint berikut melalui browser:

```text
http://localhost:5000/api/products
```

Endpoint tersebut mengembalikan seluruh daftar produk dalam format JSON.

Proses pengambilan data dimulai dari file:

```text
frontend/src/pages/CashierPage.js
```

Pada file tersebut terdapat fungsi `loadData`.

```javascript
async function loadData() {
  try {
    setLoading(true)
    setError('')

    const categoryResponse = await fetch(
      'http://localhost:5000/api/categories'
    )

    const productResponse = await fetch(
      'http://localhost:5000/api/products'
    )

    // Kode berikutnya...
  } catch (error) {
    setError(error.message)
  } finally {
    setLoading(false)
  }
}
```

Saat halaman pertama kali dibuka, `useEffect` menjalankan fungsi `loadData`.

```javascript
useEffect(() => {
  loadData()
}, [])
```

Karena dependency array-nya kosong, fungsi tersebut dijalankan ketika komponen pertama kali ditampilkan.

Di dalam `loadData`, frontend melakukan `fetch` ke endpoint `/api/products`.

```javascript
const productResponse = await fetch(
  'http://localhost:5000/api/products'
)
```

Request ini digunakan untuk meminta seluruh data produk dari backend.

---

## 4. Request masuk ke backend

Backend dijalankan melalui file:

```text
backend/src/server.js
```

```javascript
import app from './app.js'

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`)
})
```

`app.listen()` menjalankan server pada port `5000` dan menunggu request dari client.

Request `/api/products` kemudian diproses di file:

```text
backend/src/app.js
```

Pada file tersebut terdapat kode:

```javascript
app.use('/api/products', productRoutes)
```

Artinya, setiap request yang dimulai dengan path `/api/products` akan diteruskan ke `productRoutes`.

---

## 5. Product route memilih controller

File route produk berada di:

```text
backend/src/routes/productRoutes.js
```

```javascript
import express from 'express'
import { getProducts } from '../controllers/productController.js'

const router = express.Router()

router.get('/', getProducts)

export default router
```

Frontend mengirim request menggunakan method `GET` ke:

```text
/api/products
```

Path `/api/products` sudah ditangani oleh `app.js`, sehingga pada router path lanjutannya adalah `/`.

Karena cocok dengan:

```javascript
router.get('/', getProducts)
```

maka Express menjalankan fungsi `getProducts`.

---

## 6. Controller mengirim data produk

Fungsi `getProducts` berada di:

```text
backend/src/controllers/productController.js
```

```javascript
import products from '../data/products.js'

export function getProducts(req, res) {
  res.json(products)
}
```

Data produk sendiri tersimpan di:

```text
backend/src/data/products.js
```

Contoh bentuk datanya:

```javascript
const products = [
  {
    id: 1,
    name: 'Nasi Goreng',
    description: 'Nasi goreng dengan telur dan ayam.',
    category: 'food',
    price: 18000,
    stock: 20,
    icon: '🍛',
  },
]
```

Controller mengimpor array tersebut, lalu:

```javascript
res.json(products)
```

mengirimkan response kepada frontend berupa seluruh data produk dalam format JSON.

Alurnya sampai tahap ini adalah:

```text
CashierPage.js
→ fetch /api/products
→ app.js
→ productRoutes.js
→ getProducts
→ products.js
→ res.json(products)
```

---

## 7. Frontend menerima response produk

Setelah backend mengirim response, proses kembali ke fungsi `loadData` di:

```text
frontend/src/pages/CashierPage.js
```

Response awal disimpan di variabel `productResponse`.

```javascript
const productResponse = await fetch(
  'http://localhost:5000/api/products'
)
```

Variabel tersebut masih berupa object HTTP response, belum langsung berupa array produk.

Body JSON kemudian dibaca menggunakan:

```javascript
const productData = await productResponse.json()
```

Hasilnya menjadi data JavaScript dan disimpan ke variabel `productData`.

Data tersebut kemudian dimasukkan ke state `products`.

```javascript
setProducts(productData)
```

State produk sebelumnya dibuat dengan:

```javascript
const [products, setProducts] = useState([])
```

Ketika `setProducts` dipanggil, nilai state berubah dan React melakukan render ulang.

---

# Bagian B — Mengambil kategori dan memfilter produk

## 8. Frontend meminta data kategori

Selain produk, frontend juga mengambil data kategori melalui endpoint:

```text
http://localhost:5000/api/categories
```

Request dilakukan di fungsi `loadData` yang sama.

```javascript
const categoryResponse = await fetch(
  'http://localhost:5000/api/categories'
)
```

Alurnya sama seperti data produk:

```text
CashierPage.js
→ fetch /api/categories
→ app.js
→ categoryRoutes.js
→ categoryController.js
→ categories.js
→ response JSON
```

Setelah response diterima, body JSON dibaca:

```javascript
const categoryData = await categoryResponse.json()
```

Kemudian data kategori disimpan ke state `categories`.

```javascript
setCategories([
  {
    id: 'all',
    name: 'Semua',
    icon: 'bi-grid',
  },
  ...categoryData,
])
```

Kategori `all` ditambahkan pada frontend karena digunakan untuk menampilkan seluruh produk.

State kategorinya dibuat dengan:

```javascript
const [categories, setCategories] = useState([])
```

Data kategori ini digunakan oleh komponen `CategoryFilter` untuk membuat tombol kategori.

```javascript
<CategoryFilter
  categories={categories}
  selectedCategory={selectedCategory}
  onSelectCategory={setSelectedCategory}
/>
```

Ketika pengguna memilih kategori, nilai kategori yang dipilih disimpan ke state:

```javascript
const [selectedCategory, setSelectedCategory] =
  useState('all')
```

---

## 9. Frontend memfilter produk

Setelah data produk dan kategori tersedia, frontend menentukan produk mana yang akan ditampilkan.

Kode ini berada di:

```text
frontend/src/pages/CashierPage.js
```

```javascript
const filteredProducts = useMemo(() => {
  if (selectedCategory === 'all') {
    return products
  }

  return products.filter(
    (product) => product.category === selectedCategory
  )
}, [products, selectedCategory])
```

Jika kategori yang dipilih adalah `all`, seluruh produk akan digunakan.

```javascript
return products
```

Jika kategori tertentu dipilih, frontend menjalankan `.filter()`.

```javascript
products.filter(
  (product) => product.category === selectedCategory
)
```

Produk yang nilai `category`-nya sama dengan `selectedCategory` akan dimasukkan ke hasil filter.

Hasil akhirnya disimpan di variabel:

```javascript
filteredProducts
```

Jadi filtering dilakukan pada frontend, bukan melalui request API baru.

---

## 10. Produk dikirim ke ProductList

Hasil filter kemudian dikirim ke komponen `ProductList`.

Kode berada di:

```text
frontend/src/pages/CashierPage.js
```

```javascript
<ProductList
  products={filteredProducts}
  onAddToCart={handleAddToCart}
/>
```

`filteredProducts` dikirim melalui props bernama `products`.

Fungsi `handleAddToCart` juga dikirim melalui props `onAddToCart`.

---

## 11. ProductList membuat ProductCard

File komponen daftar produk berada di:

```text
frontend/src/components/ProductList.js
```

Di dalam komponen tersebut, data produk di-loop menggunakan `.map()`.

```javascript
{products.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
    onAddToCart={onAddToCart}
  />
))}
```

Pada setiap perulangan, parameter `product` berisi satu object produk.

Setiap object kemudian dikirim ke `ProductCard` melalui:

```javascript
product={product}
```

Komponen card berada di:

```text
frontend/src/components/ProductCard.js
```

```javascript
function ProductCard({
  product,
  onAddToCart,
}) {
```

Komponen tersebut menggunakan data `product` untuk menampilkan nama, deskripsi, harga, stok, dan icon produk.

Saat tombol Tambah ditekan, kode berikut dijalankan:

```javascript
onClick={() => onAddToCart(product)}
```

Object produk dari card tersebut dikirim ke fungsi `handleAddToCart`.

Alurnya:

```text
filteredProducts
→ ProductList
→ map()
→ ProductCard
→ tombol Tambah
→ handleAddToCart(product)
```

---

# Bagian C — Menambahkan produk ke keranjang

## 12. Fungsi handleAddToCart

Fungsi ini berada di:

```text
frontend/src/pages/CashierPage.js
```

```javascript
function handleAddToCart(product) {
  setCartItems((currentCart) => {
    const existingItem = currentCart.find(
      (item) => item.id === product.id
    )

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        window.alert(
          'Jumlah produk sudah mencapai batas stok'
        )

        return currentCart
      }

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

State keranjang dibuat dengan:

```javascript
const [cartItems, setCartItems] = useState([])
```

Ketika pertama kali aplikasi dibuka, `cartItems` masih berupa array kosong.

---

## 13. Memeriksa produk yang sudah ada

Produk yang diklik diperiksa menggunakan `.find()`.

```javascript
const existingItem = currentCart.find(
  (item) => item.id === product.id
)
```

Frontend membandingkan ID item dalam keranjang dengan ID produk yang diklik.

Jika ditemukan, hasilnya disimpan ke `existingItem`.

Jika tidak ditemukan, nilai `existingItem` menjadi `undefined`.

---

## 14. Jika produk sudah ada di keranjang

Jika `existingItem` berisi data, frontend memeriksa stok.

```javascript
if (existingItem.quantity >= product.stock) {
  window.alert(
    'Jumlah produk sudah mencapai batas stok'
  )

  return currentCart
}
```

Jika quantity sudah mencapai stok, keranjang dikembalikan tanpa perubahan.

Jika stok masih tersedia, frontend melakukan `.map()` pada keranjang.

```javascript
return currentCart.map((item) => {
  if (item.id === product.id) {
    return {
      ...item,
      quantity: item.quantity + 1,
    }
  }

  return item
})
```

Jika ID item sama dengan ID produk yang diklik, quantity ditambah satu.

Item lain dikembalikan tanpa perubahan.

---

## 15. Jika produk belum ada di keranjang

Jika produk belum ditemukan, bagian berikut dijalankan:

```javascript
return [
  ...currentCart,
  {
    ...product,
    quantity: 1,
  },
]
```

`...currentCart` mempertahankan seluruh isi keranjang sebelumnya.

`...product` menyalin seluruh data produk yang diklik.

Kemudian ditambahkan property:

```javascript
quantity: 1
```

Produk tersebut masuk ke keranjang dengan jumlah awal satu.

---

# Bagian D — Menampilkan keranjang

## 16. State cartItems dikirim ke Cart

Setelah `cartItems` berubah, React melakukan render ulang.

State tersebut dikirim ke komponen `Cart`.

Kode berada di:

```text
frontend/src/pages/CashierPage.js
```

```javascript
<Cart
  cartItems={cartItems}
  subtotal={subtotal}
  tax={tax}
  total={total}
  totalItems={totalItems}
  paymentAmount={paymentAmount}
  onPaymentChange={setPaymentAmount}
  onIncrease={handleIncreaseQuantity}
  onDecrease={handleDecreaseQuantity}
  onRemove={handleRemoveItem}
  onCheckout={handleCheckout}
/>
```

Komponen `Cart` menerima data keranjang serta beberapa fungsi untuk mengelola keranjang.

---

## 17. Cart menampilkan CartItem

File komponen keranjang berada di:

```text
frontend/src/components/Cart.js
```

Di dalamnya terdapat:

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

Setiap item di-loop menggunakan `.map()`.

Setiap object item kemudian dikirim ke komponen:

```text
frontend/src/components/CartItem.js
```

Komponen tersebut menampilkan nama produk, harga, quantity, subtotal item, serta tombol tambah, kurang, dan hapus.

---

# Bagian E — Menghitung pembayaran

## 18. Menghitung subtotal

Perhitungan dilakukan di:

```text
frontend/src/pages/CashierPage.js
```

```javascript
const subtotal = cartItems.reduce(
  (total, item) =>
    total + item.price * item.quantity,
  0
)
```

Untuk setiap item, harga dikalikan dengan quantity.

Seluruh hasil kemudian dijumlahkan menggunakan `.reduce()`.

---

## 19. Menghitung pajak dan total

Setelah subtotal didapat, frontend menghitung pajak 10 persen.

```javascript
const tax = Math.round(subtotal * 0.1)
```

Kemudian subtotal dan pajak dijumlahkan.

```javascript
const total = subtotal + tax
```

Alurnya:

```text
cartItems
→ harga × quantity
→ subtotal
→ pajak 10 persen
→ total pembayaran
```

---

## 20. Memasukkan uang pelanggan

Input pembayaran berada di:

```text
frontend/src/components/PaymentSummary.js
```

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

Nilai pembayaran disimpan di state:

```text
frontend/src/pages/CashierPage.js
```

```javascript
const [paymentAmount, setPaymentAmount] =
  useState('')
```

Ketika input berubah, `onPaymentChange` menjalankan `setPaymentAmount`.

Saat tombol Bayar ditekan:

```javascript
onClick={onCheckout}
```

fungsi `handleCheckout` dijalankan.

---

# Bagian F — Mengirim transaksi ke backend

## 21. Fungsi handleCheckout

Fungsi ini berada di:

```text
frontend/src/pages/CashierPage.js
```

Pada awal fungsi, frontend memeriksa apakah keranjang kosong.

```javascript
if (cartItems.length === 0) {
  return
}
```

Nilai pembayaran diubah menjadi number.

```javascript
const payment = Number(paymentAmount)
```

Kemudian divalidasi.

```javascript
if (!payment || payment <= 0) {
  window.alert(
    'Jumlah pembayaran tidak valid'
  )

  return
}
```

---

## 22. Membuat data transaksi

Data `cartItems` memiliki banyak property, seperti nama, harga, stok, dan deskripsi.

Namun backend hanya membutuhkan ID produk dan quantity.

Karena itu, frontend membuat array baru:

```javascript
const transactionItems = cartItems.map(
  (item) => ({
    productId: item.id,
    quantity: item.quantity,
  })
)
```

Contoh hasilnya:

```javascript
[
  {
    productId: 1,
    quantity: 2,
  },
  {
    productId: 4,
    quantity: 1,
  },
]
```

---

## 23. Mengirim request POST

Frontend mengirim transaksi ke endpoint:

```text
http://localhost:5000/api/transactions
```

Kode request-nya:

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

Method yang digunakan adalah `POST` karena frontend mengirim data transaksi baru.

Header:

```javascript
'Content-Type': 'application/json'
```

memberi tahu backend bahwa body request dikirim dalam format JSON.

`JSON.stringify()` mengubah object JavaScript menjadi JSON sebelum dikirim.

Data yang dikirim berisi:

```text
items
paymentAmount
```

---

# Bagian G — Backend memproses transaksi

## 24. Request masuk ke transaction route

Di file:

```text
backend/src/app.js
```

terdapat:

```javascript
app.use(
  '/api/transactions',
  transactionRoutes
)
```

Request kemudian diarahkan ke:

```text
backend/src/routes/transactionRoutes.js
```

```javascript
router.post('/', createTransaction)
```

Karena request menggunakan method `POST`, route menjalankan fungsi `createTransaction`.

---

## 25. Mengambil body request

Fungsi `createTransaction` berada di:

```text
backend/src/controllers/transactionController.js
```

Backend mengambil data dari body request.

```javascript
const items = req.body.items
const paymentAmount = Number(
  req.body.paymentAmount
)
```

Backend juga menyiapkan variabel untuk perhitungan.

```javascript
let subtotal = 0
const transactionItems = []
```

---

## 26. Validasi awal transaksi

Backend memeriksa apakah transaksi memiliki item.

```javascript
if (!items || items.length === 0) {
  return res.status(400).json({
    message: 'Keranjang masih kosong',
  })
}
```

Backend juga memeriksa jumlah pembayaran.

```javascript
if (!paymentAmount || paymentAmount <= 0) {
  return res.status(400).json({
    message: 'Jumlah pembayaran tidak valid',
  })
}
```

Status `400` berarti request dari client tidak valid.

---

## 27. Memproses setiap item

Backend melakukan perulangan menggunakan `for...of`.

```javascript
for (const item of items) {
  const product = products.find(
    (product) =>
      product.id === Number(item.productId)
  )

  // Proses berikutnya...
}
```

Untuk setiap item, backend mencari data produk asli berdasarkan `productId`.

Backend tidak langsung mempercayai harga dari frontend. Harga asli tetap diambil dari data backend.

---

## 28. Validasi produk

Jika produk tidak ditemukan:

```javascript
if (!product) {
  return res.status(404).json({
    message:
      `Produk dengan ID ${item.productId} tidak ditemukan`,
  })
}
```

Status `404` menunjukkan bahwa produk yang diminta tidak tersedia.

---

## 29. Validasi quantity dan stok

Quantity diubah menjadi number.

```javascript
const quantity = Number(item.quantity)
```

Backend memastikan quantity lebih dari nol.

```javascript
if (quantity <= 0) {
  return res.status(400).json({
    message:
      'Jumlah produk harus lebih dari 0',
  })
}
```

Backend kemudian memeriksa stok.

```javascript
if (quantity > product.stock) {
  return res.status(400).json({
    message:
      `Stok ${product.name} tidak cukup`,
  })
}
```

---

## 30. Menghitung subtotal item

Jika semua valid, subtotal item dihitung.

```javascript
const itemSubtotal =
  product.price * quantity
```

Nilainya ditambahkan ke subtotal transaksi.

```javascript
subtotal += itemSubtotal
```

Data item kemudian dimasukkan ke array `transactionItems`.

```javascript
transactionItems.push({
  productId: product.id,
  name: product.name,
  price: product.price,
  quantity: quantity,
  subtotal: itemSubtotal,
})
```

Proses tersebut diulang untuk seluruh item yang dibeli.

---

## 31. Menghitung total transaksi

Setelah semua item diproses, backend menghitung pajak.

```javascript
const tax = Math.round(subtotal * 0.1)
```

Kemudian menghitung total.

```javascript
const total = subtotal + tax
```

Backend menghitung ulang nilai ini agar total transaksi tidak hanya bergantung pada perhitungan frontend.

---

## 32. Memeriksa uang pelanggan

Backend memeriksa apakah pembayaran mencukupi.

```javascript
if (paymentAmount < total) {
  return res.status(400).json({
    message: 'Uang pembayaran kurang',
    total: total,
  })
}
```

Jika uang kurang, transaksi dihentikan dan backend mengirim response error.

---

## 33. Mengurangi stok

Jika pembayaran mencukupi, backend mengurangi stok setiap produk.

```javascript
for (const item of transactionItems) {
  const product = products.find(
    (product) =>
      product.id === item.productId
  )

  product.stock =
    product.stock - item.quantity
}
```

Jumlah stok dikurangi berdasarkan quantity yang dibeli.

---

## 34. Membuat object transaksi

Backend kemudian membuat object transaksi baru.

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

Object ini berisi:

```text
ID transaksi
daftar produk
subtotal
pajak
total
uang pembayaran
kembalian
waktu transaksi
```

Kembalian dihitung menggunakan:

```javascript
paymentAmount - total
```

---

## 35. Menyimpan transaksi

Object transaksi dimasukkan ke array `transactions`.

```javascript
transactions.push(newTransaction)
```

Array tersebut berada di:

```text
backend/src/data/transactions.js
```

```javascript
const transactions = []

export default transactions
```

Pada project ini data masih disimpan di array sementara. Karena belum menggunakan database, data transaksi akan kembali kosong jika backend direstart.

---

## 36. Mengirim response transaksi

Setelah transaksi berhasil disimpan, backend mengirim response dengan status `201`.

```javascript
res.status(201).json({
  message: 'Transaksi berhasil',
  data: newTransaction,
})
```

Status `201` menunjukkan bahwa data baru berhasil dibuat.

Response tersebut berisi object transaksi, termasuk jumlah kembalian.

---

# Bagian H — Frontend menerima hasil transaksi

## 37. Membaca response backend

Proses kembali ke fungsi `handleCheckout` di:

```text
frontend/src/pages/CashierPage.js
```

Response backend dibaca menggunakan:

```javascript
const result = await response.json()
```

Jika response gagal:

```javascript
if (!response.ok) {
  throw new Error(result.message)
}
```

Pesan error kemudian ditampilkan melalui blok `catch`.

```javascript
catch (error) {
  window.alert(error.message)
}
```

---

## 38. Menampilkan hasil pembayaran

Jika transaksi berhasil, frontend menampilkan alert.

```javascript
window.alert(
  `Pembayaran berhasil.\nKembalian: Rp${result.data.change.toLocaleString(
    'id-ID'
  )}`
)
```

Nilai kembalian berasal dari response backend:

```javascript
result.data.change
```

Setelah itu keranjang dikosongkan.

```javascript
setCartItems([])
```

Input pembayaran juga dikosongkan.

```javascript
setPaymentAmount('')
```

Frontend kemudian menjalankan kembali `loadData`.

```javascript
await loadData()
```

Hal ini dilakukan agar frontend mengambil data produk terbaru dan menampilkan stok yang sudah berkurang.

Alur transaksi secara ringkas:

```text
klik Bayar
→ handleCheckout
→ POST /api/transactions
→ transactionRoutes
→ createTransaction
→ validasi produk dan stok
→ hitung total
→ cek pembayaran
→ kurangi stok
→ simpan transaksi
→ kirim response
→ tampilkan kembalian
→ kosongkan keranjang
→ ambil ulang produk
```

---

# Bagian I — Menampilkan riwayat transaksi

## 39. Tombol riwayat

Tombol Riwayat berada di komponen:

```text
frontend/src/components/NavbarKasir.js
```

Saat tombol diklik, fungsi `handleShowHistory` dijalankan.

Fungsi tersebut berada di:

```text
frontend/src/pages/CashierPage.js
```

```javascript
async function handleShowHistory() {
  try {
    const response = await fetch(
      'http://localhost:5000/api/transactions'
    )

    if (!response.ok) {
      throw new Error(
        'Gagal mengambil riwayat transaksi'
      )
    }

    const data = await response.json()

    setTransactions(data)
    setShowHistory(true)
  } catch (error) {
    window.alert(error.message)
  }
}
```

Frontend mengirim request `GET` ke endpoint `/api/transactions`.

---

## 40. Backend mengirim riwayat transaksi

Di file:

```text
backend/src/routes/transactionRoutes.js
```

terdapat:

```javascript
router.get('/', getTransactions)
```

Route tersebut menjalankan fungsi:

```text
backend/src/controllers/transactionController.js
```

```javascript
export function getTransactions(req, res) {
  res.json(transactions)
}
```

Backend mengirim seluruh array transaksi dalam format JSON.

---

## 41. Riwayat ditampilkan pada modal

Frontend menyimpan hasil response ke state:

```javascript
setTransactions(data)
```

Lalu membuka modal:

```javascript
setShowHistory(true)
```

Data tersebut diteruskan ke komponen:

```text
frontend/src/components/TransactionHistory.js
```

```javascript
<TransactionHistory
  show={showHistory}
  transactions={transactions}
  onClose={() => setShowHistory(false)}
/>
```

Di dalam komponen tersebut, transaksi di-loop menggunakan `.map()`.

Setiap transaksi menampilkan:

```text
ID transaksi
waktu pembelian
nama produk
quantity
subtotal item
total transaksi
```

---

# 42. Penutup

Dengan demikian, aplikasi web kasir ini memiliki alur lengkap.

Frontend mengambil data produk dan kategori dari backend melalui API. Data produk kemudian disimpan ke state, difilter berdasarkan kategori, dan ditampilkan melalui komponen React.

Ketika produk ditambahkan ke keranjang, frontend mengelola quantity, menghitung subtotal, pajak, dan total pembayaran.

Saat transaksi dilakukan, frontend mengirim ID produk, quantity, dan jumlah pembayaran ke backend.

Backend kemudian memvalidasi produk, memeriksa stok, menghitung ulang total, mengurangi stok, menyimpan transaksi, dan mengirim jumlah kembalian kepada frontend.

Frontend menampilkan hasil pembayaran, memperbarui data stok, dan menyediakan tampilan riwayat transaksi.

Karena project ini masih menggunakan array JavaScript sebagai penyimpanan sementara, data akan kembali ke kondisi awal ketika backend dimatikan atau dijalankan ulang.
