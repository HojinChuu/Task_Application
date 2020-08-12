import Swal from 'sweetalert2'

const showAlert = {
	error(title, text) {
		Swal.fire({
			title,
			text,
			icon: 'warning',
		})
	},
	success(title, text) {
		Swal.fire({
			title,
			text,
			icon: 'success',
		})
	}
}

export default showAlert