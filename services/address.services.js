const Address = require("../models/address");

const getAllAddresses = async (req, res) => {
    try {
        const addresses = await Address.findAll();
        res.status(200).json(addresses);
    } catch (error) {
        console.error(error);
    }
};

const getAddressById = async (req, res) => {
    const id = req.params.id;
    try {
        const address = await Address.findByPk(id);
        if (address) {
            res.status(200).json(address);
        }
        else {
            return res.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        console.error(error);
    }
}

const getAddressByStreet = async (req, res) => {
    const street_address = req.params.street_address;

    try {
        const address = await Address.findAll({ where: { street_address: street_address } });
        if (address) {
            res.status(200).json(address);
        }
        else {
            return res.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        console.error(error);
    }
};

const getAddressByCity = async (req, res) => {
    const city = req.params.city;

    try {
        const address = await Address.findAll({ where: { city: city } });
        if (address) {
            res.status(200).json(address);
        }
        else {
            return res.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        console.error(error);
    }
};

const getAddressByCountry = async (req, res) => {
    const country = req.params.country;

    try {
        const address = await Address.findAll({ where: { country: country } });
        if (address) {
            res.status(200).json(address);
        }
        else {
            return res.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        console.error(error);
    }
};

const createAddress = async (req, res) => {
    const { street_address, city, country } = req.body;

    try {

        const address = await Address.create({
            street_address,
            city,
            country,
        });

        res.status(201).json(address);
    } catch (error) {
        console.error(error);
    }
};

const updateAddress = async (req, res) => {
    const { street_address, city, country } = req.body;

    try {

        const address = await Address.update({
            street_address,
            city,
            country,
        } , { where: { id: req.params.id } });

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(201).json({ message: 'Address updated successfully' ,
        address: address.toJSON});

    } catch (error) {
        console.error(error);
    }
};

const deleteAddress = async (req, res) => {
    const id = req.params.id;
    const address = await Address.findByPk(id);

    try {
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        const deletedAddress = await address.destroy();

        if (deletedAddress)
            res.status(200).json({ message: 'Address deleted successfully' });

    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    getAllAddresses,
    getAddressById,
    getAddressByStreet,
    getAddressByCity,
    getAddressByCountry,
    createAddress,
    updateAddress,
    deleteAddress
}