function Header() {
  return (
    <header className="bg-[#54295c] text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img
          src="/img/CD.png"
          alt="CyberDojo Logo"
          className="w-20 h-20"
        />
        <h1 className="text-xl font-semibold">CyberDojo</h1>
      </div>
      <nav className="flex space-x-6">
        <button className="hover:bg-[#4b2153] px-4 py-2 rounded">Corsi</button>
        <button className="hover:bg-[#4b2153] px-4 py-2 rounded">Shop</button>
        <button className="hover:bg-[#4b2153] px-4 py-2 rounded">Supporto</button>
      </nav>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img
            src="/img/coin.png"
            alt="Coins Icon"
            className="w-20 h-20"
          />
          <span>1</span>
        </div>
        <img
          src="/path-to-profile-icon.png"
          alt="Profile Icon"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
}

export default Header;
