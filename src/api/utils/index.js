import { fileURLToPath } from "url";

import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url) // obtengo el nombre del archivo actual


const __dirname  = join(dirname(__filename), "../../../")

export {
    __dirname,
    join
}