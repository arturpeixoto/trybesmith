// Código retirado do curso da Trybe

function checkRequiredFields(receivedFields: object, requiredFields: string[]): string | undefined {
  for (let i = 0; i < requiredFields.length; i += 1) {
    const currentField = requiredFields[i];
    if (!(currentField in receivedFields)) {
      return `"${currentField}" is required`;
    }
  }
}

export default checkRequiredFields;