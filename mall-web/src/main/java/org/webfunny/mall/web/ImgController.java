package org.webfunny.mall.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Base64Utils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.webfunny.mall.service.entity.Img;
import org.webfunny.mall.service.repository.ImgRepository;

@RestController
@RequestMapping("/api/img")
public class ImgController {

	@Autowired
	private ImgRepository imgRepository;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public void get(@PathVariable Long id, HttpServletResponse response) {
		try {
			Img img = imgRepository.findOne(id);
			if (img != null) {
				String data = img.getThumbUrl();
				byte[] bytes = Base64Utils.decodeFromString(data);
				for (int i = 0; i < bytes.length; ++i) {
					if (bytes[i] < 0) {// 调整异常数据
						bytes[i] += 256;
					}
				}
				ServletOutputStream out = response.getOutputStream();
				out.write(bytes);
				out.flush();
				out.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "thumb/{uid}", method = RequestMethod.GET)
	public void get(@PathVariable String uid, HttpServletResponse response) {
		try {
			Img img = imgRepository.findByUid(uid);
			if (img != null) {
				String data = img.getThumbUrl();
				byte[] bytes = Base64Utils.decodeFromString(data);
				for (int i = 0; i < bytes.length; ++i) {
					if (bytes[i] < 0) {// 调整异常数据
						bytes[i] += 256;
					}
				}
				ServletOutputStream out = response.getOutputStream();
				out.write(bytes);
				out.flush();
				out.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "upload", method = RequestMethod.POST)
	public Long upload(@RequestParam(value = "uid", required = true) String uid,
			@RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "type", required = true) String type,
			@RequestParam(value = "size", required = false) String size,
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "thumbUrl", required = true) String thumbUrl) {
		try {
			if (!StringUtils.isEmpty(thumbUrl)) {
				thumbUrl = thumbUrl.split(",")[1];
			}
			Img img = new Img(uid, name, type, status, size, thumbUrl);
			img = imgRepository.save(img);
			if (img != null && img.getId() != null) {
				return img.getId();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

	}

	@RequestMapping(value = "batchUpload", method = RequestMethod.POST)
	public void batchUpload(@RequestBody Img[] imgs) {
		try {
			if (imgs != null && imgs.length > 0) {
				List<Img> imgList = new ArrayList<Img>();
				for (Img img : imgs) {
					if (img.getUid() != null) {
						Img temp = imgRepository.findByUid(img.getUid());
						if (temp != null) {
							continue;
						} else {
							if (!StringUtils.isEmpty(img.getThumbUrl())) {
								img.setThumbUrl(img.getThumbUrl().split(",")[1]);
							}
							imgList.add(img);
						}
					}
				}
				imgRepository.save(imgList);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "preview", method = RequestMethod.POST)
	public void preview(@RequestParam("file") MultipartFile file) {
	}
}
