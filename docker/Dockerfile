FROM gitpod/workspace-dotnet

RUN sudo apt-get update && \
    sudo apt-get install gettext libncurses5 libxkbcommon0 libtinfo5 -y

USER gitpod

RUN brew tap suborbital/subo && \
    brew install subo && \
    brew install httpie && \
    brew install bat && \
    brew install exa && \
    brew install hey && \
    brew tap nats-io/nats-tools && \
    brew install nats-io/nats-tools/nats && \
    brew install pv

# ------------------------------------
# Install TinyGo
# ------------------------------------
ARG TINYGO_VERSION="0.23.0"
RUN wget https://github.com/tinygo-org/tinygo/releases/download/v${TINYGO_VERSION}/tinygo_${TINYGO_VERSION}_amd64.deb
RUN sudo dpkg -i tinygo_${TINYGO_VERSION}_amd64.deb
RUN rm tinygo_${TINYGO_VERSION}_amd64.deb

# ------------------------------------
# Install Rust support
# ------------------------------------
RUN rustup toolchain uninstall stable-x86_64-unknown-linux-gnu && \
    curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh -s -- -y && \
    curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh && \
    rustup target add wasm32-wasi

# ------------------------------------
# Install grain support
# ------------------------------------
RUN sudo curl -L --output /usr/local/bin/grain \
https://github.com/grain-lang/grain/releases/download/grain-v0.5.1/grain-linux-x64 \
&& sudo chmod +x /usr/local/bin/grain

# ------------------------------------
# Install Sat (Suborbital)
# ------------------------------------
RUN git clone --depth=1 https://github.com/suborbital/sat.git && \
    cd sat && \
    go build -o .bin/sat -tags netgo,wasmtime . && \
    sudo cp .bin/sat /usr/local/bin/sat && \
    cd .. && \
    rm -rf sat

# ------------------------------------
# Install Wagi (Deislab)
# ------------------------------------
RUN mkdir tmp-wagi && \
    cd tmp-wagi && \
    wget https://github.com/deislabs/wagi/releases/download/v0.8.1/wagi-v0.8.1-linux-amd64.tar.gz && \
    tar -zxf wagi-v0.8.1-linux-amd64.tar.gz && \
    sudo cp wagi /usr/local/bin/wagi && \
    cd .. && \
    rm -rf tmp-wagi

# ------------------------------------
# Install Spin (Fermyon)
# ------------------------------------
RUN wget https://github.com/fermyon/spin/releases/download/v0.2.0/spin-v0.2.0-linux-amd64.tar.gz && \
    tar xfv spin-v0.2.0-linux-amd64.tar.gz && \
    sudo cp spin /usr/local/bin/spin && \
    rm spin; rm readme.md; rm LICENSE; rm spin-v0.2.0-linux-amd64.tar.gz

# ------------------------------------
# Install Dot.NEt Core Preview
# ------------------------------------
RUN wget https://download.visualstudio.microsoft.com/download/pr/1c28fb12-c30d-411f-8d63-4dd9835387fe/cfe3d86f5600568ac354f7546f876589/dotnet-sdk-7.0.100-preview.5.22307.18-linux-x64.tar.gz
RUN mkdir -p $HOME/dotnet && tar zxf dotnet-sdk-7.0.100-preview.5.22307.18-linux-x64.tar.gz -C $HOME/dotnet
RUN rm dotnet-sdk-7.0.100-preview.5.22307.18-linux-x64.tar.gz

RUN export DOTNET_ROOT=$HOME/dotnet && \
    export PATH=$PATH:$HOME/dotnet && \
    dotnet workload install wasm-tools

# ------------------------------------
# Install Wasi Runtimes
# ------------------------------------
RUN curl -sSf https://raw.githubusercontent.com/WasmEdge/WasmEdge/master/utils/install.sh | bash -s -- -v 0.10.0 && \
    curl https://get.wasmer.io -sSfL | sh && \
    curl https://wasmtime.dev/install.sh -sSf | bash

# ------------------------------------
# Install NATS server
# ------------------------------------

ARG NATS_VERSION="2.8.4"
ARG NATS_OS="linux-amd64"
RUN curl -L https://github.com/nats-io/nats-server/releases/download/v${NATS_VERSION}/nats-server-v${NATS_VERSION}-${NATS_OS}.zip -o nats-server.zip && \
    unzip nats-server.zip -d nats-server && \
    sudo cp nats-server/nats-server-v${NATS_VERSION}-${NATS_OS}/nats-server /usr/bin && \
    rm nats-server.zip && \
    rm -rf nats-server
