package org.webfunny.mall.web;

import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.PathVariable;
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
		Img img = imgRepository.findOne(id);
		if (img != null) {
			String data = img.getImgData();
			try {
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
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	@RequestMapping(method = RequestMethod.POST)
	public Long upload(@RequestParam("file") MultipartFile file) {
		if (!file.isEmpty()) {
			try {
				// 通过base64来转化图片
				String data = Base64Utils.encodeToString(file.getBytes());
				Img img = new Img(data);
				img = imgRepository.save(img);
				if (img != null && img.getId() != null) {
					return img.getId();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
}
