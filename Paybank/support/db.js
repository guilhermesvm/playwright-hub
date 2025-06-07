import pgPromise from 'pg-promise'

const pgp = pgPromise();
const db = pgp('postgresql://dba:dba@paybank-db:5432/UserDB');

export async function getLatest2FACode(cpf){
    const query = `
        SELECT t.code
        FROM public."TwoFactorCode" t
        INNER JOIN public."User" u ON u."id" = t."userId"
        WHERE u."cpf" = '${cpf}'
        ORDER BY t.id DESC
        LIMIT 1
    `

    const result = await db.oneOrNone(query);
    return result.code;
}