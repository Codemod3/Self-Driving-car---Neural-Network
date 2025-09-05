class NeuralNetwork {
    constructor(neuronCounts) {
        this.levels = [];
        for (let i = 0; i < neuronCounts.length - 1; i++) {
            this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
        }
    }

    static feedForward(givenInputs, network) {
        let outputs = Level.feedForward(givenInputs, network.levels[0]);
        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(outputs, network.levels[i]);
        }
        return outputs;
    }

    // Gaussian mutation (amount = stddev). Scaled by fan-in; safer than lerp-to-random.
    static mutate(network, amount = 0.2) {
        network.levels.forEach(level => {
            // biases
            for (let i = 0; i < level.biases.length; i++) {
                level.biases[i] += randn() * amount;
                level.biases[i] = clamp(level.biases[i], -1, 1);
            }
            // weights
            const scale = amount / Math.sqrt(level.inputs.length);
            for (let i = 0; i < level.weights.length; i++) {
                for (let j = 0; j < level.weights[i].length; j++) {
                    level.weights[i][j] += randn() * scale;
                    level.weights[i][j] = clamp(level.weights[i][j], -1, 1);
                }
            }
        });
    }
}

class Level {
    constructor(inputCount, outputCount) {
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);
        this.weights = Array.from({ length: inputCount }, () => new Array(outputCount));
        Level.#randomize(this);
    }

    // Glorot/Xavier-style init to avoid saturation; biases start at 0
    static #randomize(level) {
        const fanIn = level.inputs.length;
        const fanOut = level.outputs.length;
        const limit = Math.sqrt(6 / (fanIn + fanOut)); // [-limit, limit]

        for (let i = 0; i < fanIn; i++) {
            for (let j = 0; j < fanOut; j++) {
                level.weights[i][j] = (Math.random() * 2 - 1) * limit;
            }
        }
        for (let i = 0; i < fanOut; i++) {
            level.biases[i] = 0; // lets learning move threshold instead of random gates
        }
    }

    // Keep binary outputs for controls, but use sum + bias > 0 (cleaner threshold)
    static feedForward(givenInputs, level) {
        for (let i = 0; i < level.inputs.length; i++) {
            level.inputs[i] = givenInputs[i];
        }

        for (let i = 0; i < level.outputs.length; i++) {
            let sum = 0;
            for (let j = 0; j < level.inputs.length; j++) {
                sum += level.inputs[j] * level.weights[j][i];
            }
            // gate
            level.outputs[i] = (sum + level.biases[i] > 0) ? 1 : 0;
        }
        return level.outputs;
    }
}
