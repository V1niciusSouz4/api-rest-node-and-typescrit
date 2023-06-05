import { Request, Response } from 'express';
import * as yup from 'yup';

interface ICidade {
    name: string;
    estado: string;
}

const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
    name: yup.string().required().min(3),
    estado: yup.string().required()
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {

    let validateData: ICidade | undefined = undefined;

    try {
        validateData = await bodyValidation.validate(req.body);
    } catch (error) {
        const yupError = error as yup.ValidationError;

        return res.json({
            errors: {
                default: yupError.message,
            }
        });
    }

    console.log(validateData);

};