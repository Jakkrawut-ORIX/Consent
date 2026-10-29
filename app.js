const form = document.getElementById('pdfForm');
const regInput = document.getElementById('companyRegNo');
const phoneInput = document.getElementById('phoneNo');
const digitCount = document.getElementById('digitCount');
const submitBtn = document.getElementById('submitBtn');
const buttonText = document.getElementById('buttonText');
const spinner = document.getElementById('spinner');
const statusBox = document.getElementById('status');

function setError(name, message = '') {
  const input = form.elements[name];
  const messageBox = document.querySelector(`[data-error="${name}"]`);
  if (input) input.classList.toggle('invalid', Boolean(message));
  if (messageBox) messageBox.textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.error').forEach(el => el.textContent = '');
  document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
}

function validate(data) {
  clearErrors();
  let valid = true;
  if (!data.companyName.trim()) {
    setError('companyName', 'กรุณากรอกชื่อนิติบุคคล');
    valid = false;
  }
  if (!/^\d{13}$/.test(data.companyRegNo)) {
    setError('companyRegNo', 'เลขทะเบียนนิติบุคคลต้องเป็นตัวเลขครบ 13 หลัก');
    valid = false;
  }
  return valid;
}

function setLoading(loading) {
  submitBtn.disabled = loading;
  spinner.hidden = !loading;
  buttonText.textContent = loading ? 'กำลังสร้างเอกสาร...' : 'สร้างและดาวน์โหลด PDF';
}

regInput.addEventListener('input', () => {
  regInput.value = regInput.value.replace(/\D/g, '').slice(0, 13);
  digitCount.textContent = regInput.value.length;
  if (regInput.value.length === 13) setError('companyRegNo');
});

phoneInput.addEventListener('input', () => {
  phoneInput.value = phoneInput.value.replace(/[^\d+\- ]/g, '').slice(0, 20);
});

document.querySelectorAll('input[name="template"]').forEach(radio => {
  radio.addEventListener('change', () => {
    document.querySelectorAll('.template-option').forEach(label => label.classList.remove('selected'));
    radio.closest('.template-option').classList.add('selected');
  });
});

form.addEventListener('reset', () => {
  setTimeout(() => {
    clearErrors();
    digitCount.textContent = '0';
    statusBox.textContent = '';
    statusBox.className = 'status';
    document.querySelectorAll('.template-option').forEach(label => label.classList.remove('selected'));
    document.querySelector('input[name="template"]:checked').closest('.template-option').classList.add('selected');
  });
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  if (!validate(data)) return;

  setLoading(true);
  statusBox.className = 'status';
  statusBox.textContent = '';

  try {
    const response = await fetch('/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const problem = await response.json().catch(() => ({}));
      Object.entries(problem.errors || {}).forEach(([name, message]) => setError(name, message));
      throw new Error(problem.message || 'ไม่สามารถสร้างเอกสารได้');
    }

    const disposition = response.headers.get('Content-Disposition') || '';
    const matchedName = disposition.match(/filename="?([^";]+)"?/i);
    const fileName = matchedName?.[1] || 'document-filled.pdf';
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);

    statusBox.className = 'status success';
    statusBox.textContent = `สร้างไฟล์ ${fileName} เรียบร้อยแล้ว`;
  } catch (error) {
    statusBox.className = 'status error';
    statusBox.textContent = error.message;
  } finally {
    setLoading(false);
  }
});
