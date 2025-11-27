/**
 * Validate Payload
 * @param {*} payload
 * @returns
 */

export function isValidExpensePayload(payload) {
  const { title, amount } = payload;

  if (!title || title.toString().trim() === "") {
    return { ok: false, message: "title is required" };
  }

  const num = Number(amount);
  if (Number.isNaN(num) || num <= 0) {
    return { ok: false, message: "amount must be a number greater tahn 0" };
  }

  return { ok: true };
}