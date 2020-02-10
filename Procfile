web: bundle exec puma -t 0:5 -p ${PORT:-5000} -e ${RACK_ENV:-development}
release: rake db:migrate
