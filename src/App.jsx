import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  const [numeroInput, setNumeroInput] = useState("");
  const [ruaInput, setRuaInput] = useState("");
  const [complementoInput, setComplementoInput] = useState("");
  const [telefoneInput, setTelefoneInput] = useState("");

  async function buscarCepEndereco(cep, telefone) {
    console.log(telefone, cep);
    try {
      const response = await axios.get(
        `http://localhost:8080/cep-cadastrado?telefone=${telefone}&cep=${cep}`
      );
      const data = response.data;
      setNumeroInput(data.numero);
      setRuaInput(data.rua);
      setComplementoInput(data.complemento);
    } catch (error) {
      console.error("Erro ao buscar dados");
    }
  }

  return (
    <>
      <div className="menu-container">
        <h1>Menu Frango Assado</h1>
        <div className="options">
          <p className="item-description">Frango Simples - R$10,00</p>
          <label className="refrigerante">Escolha o refrigerante:</label>
          <select id="refrigerante" className="select-option">
            <option value="0">Não obrigado</option>
            <option value="5">Coca-Cola - R$5,00</option>
            <option value="5">Pepsi - R$5,00</option>
            <option value="4">Guaraná - R$4,00</option>
          </select>

          <div className="endereco">
            <input
              type="text"
              id="telefone"
              placeholder="Telefone"
              className="input-field"
              value={telefoneInput}
              onChange={(e) => setTelefoneInput(e.target.value)}
            />
            <input
              type="text"
              id="cep"
              placeholder="CEP"
              className="input-field"
              onBlur={(e) => buscarCepEndereco(e.target.value, telefoneInput)}
            />
            <input
              type="text"
              id="rua"
              placeholder="Rua"
              className="input-field"
              value={ruaInput}
              onChange={(e) => setRuaInput(e.target.value)}
            />
            <input
              type="text"
              id="numero"
              placeholder="Número"
              className="input-field"
              value={numeroInput}
              onChange={(e) => setNumeroInput(e.target.value)}
            />
            <input
              type="text"
              id="complemento"
              placeholder="Complemento (opcional)"
              className="input-field"
              value={complementoInput}
              onBlur={(e) => setComplementoInput(e.target.value)}
            />
          </div>

          <label className="formaPagamento">
            Escolha a forma de pagamento:
          </label>
          <div id="formaPagamento" className="payment-methods">
            <input
              type="radio"
              id="cartao"
              name="formaPagamento"
              value="Cartão"
              className="radio-btn"
            />
            <label className="radio-label">Cartão</label>
            <input
              type="radio"
              id="dinheiro"
              name="formaPagamento"
              value="Dinheiro"
              className="radio-btn"
            />
            <label className="radio-label">Dinheiro</label>
            <input
              type="radio"
              id="pix"
              name="formaPagamento"
              value="PIX"
              className="radio-btn"
            />
            <label className="radio-label">PIX</label>
          </div>
          <div id="trocoInput" className="troco-input">
            <label className="troco-label">Troco para quanto?</label>
            <input
              type="text"
              id="troco"
              placeholder="Troco para quanto?"
              className="input-field"
            />
          </div>
          <button id="adicionarCarrinho" className="btn-add-cart">
            Adicionar ao Carrinho
          </button>
          <br />
          <button id="enviarPedido" className="btn-send-order" disabled>
            Enviar Pedido para WhatsApp
          </button>
        </div>
        <div className="cart">
          <h2 className="cart-title">Carrinho</h2>
          <ul id="carrinho" className="cart-items"></ul>
          <p className="cart-total">
            Total: R${" "}
            <span id="total" className="total-amount">
              0.00
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
