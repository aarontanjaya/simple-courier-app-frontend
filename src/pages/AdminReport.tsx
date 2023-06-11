import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styles from './AdminReport.module.scss';
import { IPeriod } from '../interfaces/report';
import { MdRestartAlt } from 'react-icons/md';
import Button from '../components/UI/Button/Button';
import { useGetReportQuery } from '../services/payment';
import CardReportItem from '../components/CardReportItem/CardReportItem';
import Currency from '../components/UI/Currency/Currency';
import Loader from '../components/UI/Loader/Loader';
export default function AdminReport() {
  const [reqPeriod, setReqPeriod] = useState<IPeriod>({
    start_date: null,
    end_date: null,
  });
  const { data, isFetching } = useGetReportQuery({
    start_date: reqPeriod.start_date
      ? reqPeriod.start_date.toISOString()
      : null,
    end_date: reqPeriod.end_date ? reqPeriod.end_date.toISOString() : null,
  });
  return (
    <>
      {isFetching ? <Loader /> : null}
      <div className={`${styles.container}`}>
        <div className={`${styles.table__container}`}>
          <div className={`${styles.table__header}`}>
            <DatePicker
              className={styles.datepicker}
              selected={reqPeriod.start_date}
              placeholderText='Start Date'
              onChange={(date) =>
                setReqPeriod({ ...reqPeriod, start_date: date })
              }
              selectsStart
              startDate={reqPeriod.start_date}
              endDate={reqPeriod.end_date}
            />
            <DatePicker
              className={styles.datepicker}
              selected={reqPeriod.end_date}
              placeholderText='End Date'
              onChange={(date) =>
                setReqPeriod({ ...reqPeriod, end_date: date })
              }
              selectsEnd
              startDate={reqPeriod.start_date}
              endDate={reqPeriod.end_date}
              minDate={reqPeriod.start_date}
            />
            <Button
              variant='transparent'
              className={styles.reset}
              onClick={() => {
                setReqPeriod({
                  start_date: null,
                  end_date: null,
                });
              }}
            >
              <MdRestartAlt className={styles.icon} />
            </Button>
          </div>
          <div className={`${styles.table__content}`}>
            <div>
              <div>
                <CardReportItem
                  title='Revenue'
                  data={
                    <Currency
                      locales='en-ID'
                      currency='IDR'
                      value={data?.revenue}
                    />
                  }
                />
                <CardReportItem
                  title='Total Claimed Discount'
                  data={
                    <Currency
                      locales='en-ID'
                      currency='IDR'
                      value={data?.total_discount}
                    />
                  }
                />
                <CardReportItem
                  title='Earnings'
                  data={
                    <Currency
                      locales='en-ID'
                      currency='IDR'
                      value={data ? data?.revenue - data?.total_discount : 0}
                    />
                  }
                />
                <CardReportItem title='Payments Count' data={data?.count} />
                <CardReportItem
                  title='Average Order Size'
                  data={
                    <Currency
                      locales='en-ID'
                      currency='IDR'
                      value={data?.average_size}
                    />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
