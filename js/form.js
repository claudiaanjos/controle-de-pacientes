var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function(event) {
    event.preventDefault();
    var form = document.querySelector("#form-adiciona");
    var paciente = obtemPacienteDoForm(form);
    var erros = validaPaciente(paciente);
    if (erros.length>0){
        exibeMensagemErro(erros);
        return; 
    }
    adicionaPacienteNaTabela(paciente);
    form.reset();
    var mensagemDeErro = document.querySelector("#mensagem-erro");
    mensagemDeErro.innerHTML = "";
});

function adicionaPacienteNaTabela(paciente){
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function obtemPacienteDoForm (form) {
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    return paciente; 
}

function montaTr (paciente) {
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");
    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd (dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}

function validaPaciente(paciente){
    var erros = [];
    if(paciente.nome.length == 0){
        erros.push("O nome não pode ter campo em branco!");
    }
    if (!validaPeso(paciente.peso)) erros.push("Peso é inválido!");
    if (!validaAltura(paciente.altura)) erros.push("Altura é inválida!");
    if(paciente.gordura.length == 0){
        erros.push("O porcentual de gordura não pode ter campo em branco!");
    }
    if(paciente.peso.length == 0){
        erros.push("O peso não pode ter campo em branco!");
    }
    if(paciente.altura.length == 0){
        erros.push("A altura não pode ter campo em branco!");
    }
    return erros;
}

function exibeMensagemErro(erros){
    var ul = document.querySelector("#mensagem-erro");
    ul.innerHTML = '';
    erros.forEach(function(errado){
        var li = document.createElement("li");
        li.textContent = errado;
        ul.appendChild(li);
    })
}