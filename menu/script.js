var frangoSelecionado = 10;
var valorTotal = frangoSelecionado;

function calcularValorTotal(refrigeranteSelecionado) {
    if (!isNaN(refrigeranteSelecionado)) {
        valorTotal += refrigeranteSelecionado;
    }
    document.getElementById('total').innerText = valorTotal.toFixed(2);
    return valorTotal;
}

function construirMensagem(formaPagamento, troco) {
    var refrigeranteSelecionado = parseFloat(document.getElementById('refrigerante').value);
    var cep = document.getElementById('cep').value;
    var endereco = document.getElementById('endereco').value;
    var rua = document.getElementById('rua').value;
    var numero = document.getElementById('numero').value;
    
    var mensagem = 'Olá! Gostaria de fazer o seguinte pedido:\n';
    mensagem += '*Pedido:*\n';
    mensagem += '- Frango Simples: R$10,00\n';
    if (!isNaN(refrigeranteSelecionado)) {
        mensagem += '- Refrigerante: R$' + refrigeranteSelecionado.toFixed(2) + '\n';
    }
    mensagem += '\n';
    mensagem += '*Endereço de entrega:*\n';
    mensagem += '- CEP: ' + cep + '\n';
    mensagem += '- Endereço: ' + (endereco ? endereco : '') + '\n';
    mensagem += '- Rua: ' + (rua ? rua : '') + '\n';
    mensagem += '- Número: ' + (numero ? numero : '') + '\n';
    mensagem += '*Forma de Pagamento:*\n';
    mensagem += '- ' + formaPagamento + '\n';
    if (formaPagamento === 'Dinheiro') {
        mensagem += '*Troco para:* R$' + troco.toFixed(2);
    }

    return mensagem;
}

document.getElementById('adicionarCarrinho').addEventListener('click', function() {
    var refrigeranteSelecionado = parseFloat(document.getElementById('refrigerante').value);
    var total = calcularValorTotal(refrigeranteSelecionado);
    alert('Item adicionado ao carrinho. Total: R$' + total.toFixed(2));
    
    if (total >= frangoSelecionado) {
        document.getElementById('enviarPedido').disabled = false;
    } else {
        alert('O pedido deve ser igual ou superior ao valor do frango (R$10,00).');
        document.getElementById('enviarPedido').disabled = true;
    }
});

document.querySelectorAll('input[name="formaPagamento"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        if (this.value === 'Dinheiro') {
            document.getElementById('trocoInput').style.display = 'block';
        } else {
            document.getElementById('trocoInput').style.display = 'none';
        }
    });
});

document.getElementById('enviarPedido').addEventListener('click', function() {
    var formaPagamento = document.querySelector('input[name="formaPagamento"]:checked').value;
    var troco = 0;
    if (formaPagamento === 'Dinheiro') {
        troco = parseFloat(document.getElementById('troco').value);
        if (isNaN(troco)) {
            alert('Por favor, insira um valor válido para o troco.');
            return;
        }
    }
    
    var cep = document.getElementById('cep').value;
    var endereco = document.getElementById('endereco').value;
    var rua = document.getElementById('rua').value;
    var numero = document.getElementById('numero').value;

    if (cep === '' || endereco === '' || rua === '' || numero === '') {
        alert('Por favor, preencha todos os campos obrigatórios antes de enviar o pedido.');
        return;
    }

    if (valorTotal < frangoSelecionado) {
        alert('O pedido deve ser igual ou superior ao valor do frango (R$10,00).');
        return;
    }

    var mensagem = construirMensagem(formaPagamento, troco);

    if (mensagem) {
        var whatsappLink = 'https://wa.me/5511965009866?text=' + encodeURIComponent(mensagem);

        window.location.href = whatsappLink;
    }
});

document.getElementById('cep').addEventListener('blur', function() {
    
});