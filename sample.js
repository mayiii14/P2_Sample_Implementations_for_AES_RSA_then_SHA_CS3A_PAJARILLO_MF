// AES example
async function testAES() {

    const text = "My private information";
    const data = new TextEncoder().encode(text);

    // Make a secret AES key
    const secretKey = await crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    );

    // Random value needed for AES encryption
    const randomIV = crypto.getRandomValues(
        new Uint8Array(12)
    );

    await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: randomIV
        },
        secretKey,
        data
    );

    document.getElementById("output").innerText =
        "AES: The message was encrypted.";
}


// RSA example
async function testRSA() {

    const text = "My RSA message";
    const data = new TextEncoder().encode(text);

    // Create RSA public and private keys
    const keys = await crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
        },
        true,
        ["encrypt", "decrypt"]
    );

    await crypto.subtle.encrypt(
        {
            name: "RSA-OAEP"
        },
        keys.publicKey,
        data
    );

    document.getElementById("output").innerText =
        "RSA: The message was encrypted using the public key.";
}


// SHA-256 example
async function testSHA() {

    const text = "My original message";
    const data = new TextEncoder().encode(text);

    // Create a SHA-256 hash
    const result = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    const hash = Array.from(new Uint8Array(result))
        .map(value => value.toString(16).padStart(2, "0"))
        .join("");

    document.getElementById("output").innerText =
        "SHA-256 Hash:\n" + hash;
}
