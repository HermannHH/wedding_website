class MobilePhoneValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless Phonelib.valid? value
      record.errors[attribute] << (options[:message] || "needs to be a valid phone number" )
    end
  end
end
