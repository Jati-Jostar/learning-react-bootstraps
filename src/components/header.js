const menuNavigasi = [
  {
    id: 1,
    nama: "Home",
    tujuan: "#home"
  },
  {
    id: 2,
    nama: "About",
    tujuan: "#about"
  },
  {
    id: 3,
    nama: "Services",
    tujuan: "#services"
  },
  {
  id: 4,
  nama: "Contact",
  tujuan: "#contact"
  }
];

function Header() {
    return (
        <header className="header">
            <h1>
                Corporate Basic
            </h1>

            <nav>
                {menuNavigasi.map(function(menu) {
                    return (
                        <a key={menu.id} href={menu.tujuan}>
                            {menu.nama}
                        </a>
                    )
                })}
            </nav>
        </header>
    )
}

export default Header;