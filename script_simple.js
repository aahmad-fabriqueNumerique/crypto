import { ContractFactory, ethers } from "./ethers-5.4.esm.min.js"

let contract;
let signer;

document.getElementById("connect").addEventListener("click", () => connect());
document.getElementById("deploy").addEventListener("click", () => deploy());
document.getElementById("change").addEventListener("click", () => change());
document.getElementById("actualize").addEventListener("click", () => actualize());

async function connect() {
    // se connecter aux noeud d etherum
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    document.getElementById("accountaddress").innerText = await signer.getAddress();
}
async function deploy() {
    let contract_binfile = await fetch("bin_abi/SimpleContract_sol_SimpleContract.bin");
    let bytecode = await contract_binfile.text();
    let contract_abifile = await fetch("bin_abi/SimpleContract_sol_SimpleContract.abi");
    let abi = await contract_abifile.text();

    let factory = new ContractFactory(abi, bytecode, signer);

    contract = await factory.deploy("hello world");

    await contract.deployTransaction.wait();

    document.getElementById("contractaddress").innerText = contract.address;

    contract.on("messageChanged", (message) => {
        document.getElementById("listeevents").innerHTML += "message changed : " + message + "<br/>";
    });
    actualize();
}
async function change() {
    let message = document.getElementById("messageinput").value + Date.now;
    let res = await contract.setMessage(message);
    await res.wait();
    actualize();
}
async function actualize() {
    let message = await contract.getMessage();
    document.getElementById("messageoutput").innerText = message;
}