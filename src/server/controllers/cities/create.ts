//Importando de forma desconstruída o req e o res do express
import { Request, Response } from 'express';
//Importando tudo do yup e nomeando como yup
import * as yup from 'yup';

//Tipando um schema e nomeando ele de ICidade
interface ICidade {
    name: string;
    estado: string;
}

//Constante de validação utilizando o yup com parâmetros no ICidade
const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
    name: yup.string().required().min(3),
    estado: yup.string().required()
});

//Exportação de uma função CREATE (Req está sendo tipado com a formatação do ICidade)
export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {

    //Definindo uma variável validateData como ICidade ou undefined
    let validateData: ICidade | undefined = undefined;

    try {
        //Utilização do validate para o POSTMAN (abortEarly= false)   // Irá contar quantos erros há caso tenha mais de um
        validateData = await bodyValidation.validate(req.body, { abortEarly: false });
    } catch (err) {
        //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        const yupError = err as yup.ValidationError;
        //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        const validationErrors: Record<string, string> = {};

        yupError.inner.forEach(error => {
            console.log('erro erro erro ==>',error);
            if(error.path === undefined) return;
            validationErrors[error.path] = error.message;
        });

        //Mensagem para casos de erro
        return res.status(404).json({
            errors: {
                default: validationErrors,
            }
        });
    }

    console.log(validateData);

};